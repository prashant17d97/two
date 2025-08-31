"use client";

import ValidationLayout from "@/components/ValidationLayout";
import ResetPasswordForm from "@/components/PasswordValidationForm";
import { useState } from "react";

export default function ResetPassword() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (password) => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  };
  return (
    <ValidationLayout>
      <ResetPasswordForm submitting={submitting} onSubmit={handleSubmit} />
    </ValidationLayout>
  );
}
