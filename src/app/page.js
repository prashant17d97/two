"use client";
import OTPlayout from "@/components/otplayout";
import OtpForm from "@/components/otpform";
import { useRouter } from "next/navigation";

export default function ValidateOTP() {
  const router = useRouter();
  return (
    <OTPlayout>
      <OtpForm
        onSubmit={(code) => {
          alert(`OTP Code: ${code}`);
          router.push("/reset_password");
        }}
        onResend={() => {}}
        title="Enter OTP Code"
        email="email"
        otpLength={4}
      />
    </OTPlayout>
  );
}
