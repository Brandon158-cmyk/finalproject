"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formats";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({ courseId, price }: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (price === 0) {
        // If the course is free, create purchase directly
        await axios.post(`/api/courses/${courseId}/enroll`);
        toast.success("Enrolled successfully!");
        router.refresh();
      } else {
        // If the course is paid, redirect to Stripe checkout
        const response = await axios.post(`/api/courses/${courseId}/checkout`);
        window.location.assign(response.data.url);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="fixed bottom-0 w-full z-50 right-0 py-6 md:py-4 rounded-none md:rounded-sm md:relative md:w-auto"
      disabled={isLoading}
      onClick={onClick}
    >
      Enroll For: {price === 0 ? "Free" : `${formatPrice(price)}`}
    </Button>
  );
};

export default CourseEnrollButton;
