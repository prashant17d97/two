"use client";
import ValidationLayout from "@/components/ValidationLayout";
import OtpForm from "@/components/OtpForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

function maskEmail(email) {
  return email.replace(/(?<=.{3}).(?=.*@)/g, "*");
}

export default function PasswordOTPValidation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isPasswordRest = searchParams.get("password_reset") === "true";
  const [isVerifying, setIsVerifying] = useState(false);

  const title = isPasswordRest ? "Forgot Password" : "Enter OTP Code";

  const handleSubmit = (code) => {
    setIsVerifying(true);
    setTimeout(() => {
      if (isPasswordRest) {
        router.push("/resetpassword");
        setIsVerifying(false);
        return;
      }
      alert("OTP verified successfully for code: " + code + "");
      setIsVerifying(false);
    }, 6000);
  };

  return (
    <ValidationLayout>
      <OtpForm
        onSubmit={handleSubmit}
        onResend={() => {}}
        isVerifying={isVerifying}
        title={title}
        email={maskEmail(email) || "email address"}
        otpLength={4}
      />
    </ValidationLayout>
  );
}
