"use client";
import ValidationLayout from "@/components/ValidationLayout";
import { useRouter } from "next/navigation";

export default function ValidateOTP() {
  const router = useRouter();
  return (
    <ValidationLayout>
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-blue-500 p-6 sm:p-8">
        <button
          type="button"
          onClick={() => {
            router.push("/otp-validation?email=dummy@d.com&password_reset=false");
          }}
        >
          Go to OTP Validation Page
        </button>

        <button
          type="button"
          onClick={() => {
            router.push("/passwordreset");
          }}
        >
          Reset Password
        </button>
      </div>
    </ValidationLayout>
  );
}
