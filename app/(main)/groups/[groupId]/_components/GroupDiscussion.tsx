"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

interface Message {
  id: string;
  content: string;
  createdAt: string;
  userId: string;
  user?: {
    name: string;
    avatar: string;
  };
}

interface GroupDiscussionProps {
  groupId: string;
  isMember: boolean;
  initialMessages?: Message[];
}

const GroupDiscussion = ({
  groupId,
  isMember,
  initialMessages = [],
}: GroupDiscussionProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/groups/${groupId}/messages`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setMessages(data);
      } catch {
        toast.error("Failed to load messages");
      }
    };
    fetchMessages();
    // Set up polling for new messages
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [groupId]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/groups/${groupId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message }),
      });

      if (!response.ok) throw new Error();

      setMessage("");
      toast.success("Message sent");
      router.refresh();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isMember) {
    return (
      <div className="bg-white rounded-lg border p-6 text-center">
        <p className="text-muted-foreground">
          Join this group to participate in discussions
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Discussion</h2>
      <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="flex gap-3">
            <Avatar>
              <AvatarImage src={message.user?.avatar} />
              <AvatarFallback>
                {message.user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-baseline gap-2">
                <span className="font-medium">
                  {message.user?.name || "User"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(message.createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-sm mt-1">{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className="space-y-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="min-h-[100px]"
        />
        <Button type="submit" disabled={isSubmitting || !message.trim()}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
};

export default GroupDiscussion;
