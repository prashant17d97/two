"use client";

import ValidationLayout from "@/components/ValidationLayout";
import EmailForm from "@/components/EmailForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (email) => {
    setIsSubmitting(true);
    setTimeout(() => {
      router.push(`/otp-validation?email=${email}&password_reset=true`);
    }, 2000);
  };
  // --- Render ---
  return (
    <ValidationLayout>
      <EmailForm isSubmitting={isSubmitting} onSubmit={handleSubmit} />
    </ValidationLayout>
  );
}
