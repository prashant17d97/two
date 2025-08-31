"use client";

import {useState} from "react";
import ValidationLayout from "@/components/validationLayout";
import {useRouter} from "next/navigation";

export default function EmailValidation() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (value) => /[^\s@]+@[^\s@]+\.[^\s@]{2,}/.test(value.trim());

  const hasValue = email.trim().length > 0;
  const emailIsValid = isValidEmail(email);
  const showError = touched && hasValue && !emailIsValid;

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBlur = () => setTouched(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!emailIsValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      router.push(`/otp-validation?email=${email}&&password_reset=true`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Render ---
  return (
    <ValidationLayout>
      <form
        onSubmit={handleSubmit}
        noValidate
        aria-labelledby="reset-title"
        className="flex w-full max-w-xl flex-col gap-4 rounded-2xl bg-white p-6 sm:p-8"
      >
        {/* Title */}
        <h1
          id="otp-title"
          className="font-Inter justify-start self-stretch text-3xl font-medium text-zinc-900"
        >
          Password Reset
        </h1>

        <div className="font-Inter justify-start self-stretch text-lg leading-none font-medium text-zinc-900/70">
          We’ll send you a code to reset your password.
        </div>

        <div className="font-Inter justify-center text-base font-medium text-zinc-500">Email</div>

        {/* Email input */}
        <div>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Input Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={showError}
            aria-describedby={showError ? "email-error" : null}
            className={`w-full cursor-pointer rounded-2xl border px-4 py-3 text-base transition outline-none focus:ring-2 focus:ring-sky-600 ${
              showError ? "border-red-500" : "border-zinc-200"
            } text-[#878684] placeholder:text-zinc-500`}
          />

          {showError && (
            <p id="email-error" className="mt-2 text-sm text-red-600">
              Please enter a valid email address.
            </p>
          )}
        </div>

        {/* Submit */}

        <button
          type="submit"
          disabled={!emailIsValid || isSubmitting}
          className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 text-white transition ${
            !emailIsValid || isSubmitting
              ? "cursor-not-allowed bg-sky-700 opacity-50"
              : "cursor-pointer bg-sky-700 hover:bg-sky-800"
          }`}
        >
          <span className="text-base font-medium">Send</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M1.5 6.75A2.25 2.25 0 013.75 4.5h16.5a2.25 2.25 0 012.25 2.25v10.5A2.25 2.25 0 0120.25 19.5H3.75A2.25 2.25 0 011.5 17.25V6.75zM3 7.5l8.61 5.26a1.5 1.5 0 001.58 0L21 7.5"/>
          </svg>
        </button>
      </form>
    </ValidationLayout>
  );
}
