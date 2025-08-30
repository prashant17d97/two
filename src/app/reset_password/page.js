"use client";
import OTPlayout from "@/components/otplayout";
import OtpForm from "@/components/otpform";

export default function ResetPassword() {
  return (
    <OTPlayout>
      <OtpForm
        onSubmit={(code) => {
          alert(`OTP Code: ${code}`);
        }}
        onResend={() => {}}
        title="Forgot Password"
        email="email address"
        otpLength={4}
      />
    </OTPlayout>
  );
}
