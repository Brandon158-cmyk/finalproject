"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface GroupDiscussionProps {
  groupId: string;
  isMember: boolean;
}

const GroupDiscussion = ({ groupId, isMember }: GroupDiscussionProps) => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      {/* Messages will be added here once we implement the messages API */}
    </div>
  );
};

export default GroupDiscussion;
