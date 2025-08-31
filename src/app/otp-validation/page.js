"use client";
import ValidationLayout from "@/components/validationLayout";
import OtpForm from "@/components/otpform";
import {useSearchParams} from "next/navigation";

export default function PasswordOTPValidation() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const isPasswordRest = searchParams.get("password_reset") === "true";

  const maskedEmail = email ? email.replace(/(?<=.{3}).(?=.*@)/g, '*') : '';

  const title = isPasswordRest ? "Forgot Password" : "Enter OTP Code";

  return (
    <ValidationLayout>
      <OtpForm
        onSubmit={(code) => {
          alert(`OTP Code: ${code}`);
        }}
        onResend={() => {
        }}
        title={title}
        email={maskedEmail || "email address"}
        otpLength={4}
      />
    </ValidationLayout>
  );
}
