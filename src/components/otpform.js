import { useEffect, useRef, useState } from "react";

/**
 * Renders an OTP form component to handle user verification tasks. The form includes input fields for OTP
 * codes, a countdown timer for resending the code, and action buttons for confirming or resending the code.
 *
 * @param {Object} props - Component properties.
 * @param {function} props.onSubmit - Callback function invoked when the form is submitted with a complete OTP code.
 *                                     The function is provided the entered OTP code as a single string.
 * @param {function} props.onResend - Callback function invoked when the resend code button is clicked.
 * @param {number} [props.otpLength=4] - The number of digits in the OTP code. Defaults to 4.
 *                                       Must be a positive integer.
 * @param {string} [props.title="Enter OTP Code"] - The title of the form displayed to the user.
 * @param {string} [props.email="email"] - The email address to which the OTP was sent. Displayed as part of the instructions.
 * @param {number} [props.otpDuration=140] - The countdown duration in seconds for resending the OTP.
 *                                           Defaults to 140 seconds.
 *
 * @return {JSX.Element} The rendered OTP form component.
 */
export default function OtpForm({
  onSubmit,
  onResend,
  otpLength = 4,
  title = "Enter OTP Code",
  email = "email",
  otpDuration = 140,
}) {
  // --- OTP state ---
  const maxOtpDigits = Number.isInteger(otpLength) && otpLength > 0 ? otpLength : 4;
  const [otp, setOtp] = useState(Array(maxOtpDigits).fill(""));
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(otpDuration);
  const canResend = secondsLeft === 0;
  const [isVerifying, setIsVerifying] = useState(false);
  const isOtpComplete = otp.every((d) => d !== "");

  useEffect(() => {
    if (secondsLeft === 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  // Reset countdown when otpDuration prop changes
  useEffect(() => {
    setSecondsLeft(otpDuration);
  }, [otpDuration]);

  // Keep OTP array and input refs in sync when otpLength changes
  useEffect(() => {
    setOtp((prev) => {
      const next = prev.slice(0, maxOtpDigits);
      while (next.length < maxOtpDigits) next.push("");
      return next;
    });

    // Trim refs to the current length
    inputsRef.current = inputsRef.current.slice(0, maxOtpDigits);
  }, [maxOtpDigits]);

  const handleChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return; // numeric only, single char
    const next = [...otp];
    next[idx] = value;
    setOtp(next);

    // move focus forward on entry
    if (value && idx < maxOtpDigits - 1) {
      inputsRef.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (idx, e) => {
    // backspace to the previous input when empty
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    }
    // left/right navigation
    if (e.key === "ArrowLeft" && idx > 0) inputsRef.current[idx - 1]?.focus();
    if (e.key === "ArrowRight" && idx < maxOtpDigits - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, maxOtpDigits);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("");
    while (next.length < maxOtpDigits) next.push("");
    setOtp(next);
    // focus last filled cell
    const last = Math.min(pasted.length, maxOtpDigits) - 1;
    inputsRef.current[last >= 0 ? last : 0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVerifying || !isOtpComplete) return;
    setIsVerifying(true);
    try {
      const code = otp.join("");
      if (onSubmit) {
        onSubmit(code);
      }
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    // Parent callback (optional)
    if (onResend) {
      onResend();
    }
    // Reset cooldown and inputs
    setSecondsLeft(otpDuration);
    setOtp(Array(maxOtpDigits).fill(""));
    inputsRef.current[0]?.focus();
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col items-start justify-center gap-3 rounded-xl bg-white p-5"
      aria-labelledby="otp-title"
      aria-busy={isVerifying}
    >
      <h1
        id="otp-title"
        className="font-Inter justify-start self-stretch text-3xl font-medium text-zinc-900"
      >
        {title}
      </h1>

      <p className="justify-start self-stretch">
        <span className="font-Inter text-lg leading-none font-medium text-zinc-900/70">
          Enter code that has been sent to{" "}
        </span>
        <span className="font-Inter text-lg leading-none font-medium text-zinc-900">{email}</span>
      </p>

      <label
        htmlFor="otp-0"
        className="font-Inter sr-only justify-center pt-2 text-base font-medium text-zinc-500"
      >
        Enter Code
      </label>
      {/* OTP Inputs */}
      <div className="inline-flex h-14 items-start justify-start gap-1 self-stretch">
        {Array.from({ length: maxOtpDigits }).map((_, idx) => (
          <div
            key={idx}
            className="flex flex-1 items-center justify-start gap-3 self-stretch overflow-hidden rounded-xl bg-white px-4 py-2 text-neutral-700 outline outline-1 outline-offset-[-1px]"
          >
            <input
              id={`otp-${idx}`}
              ref={(el) => (inputsRef.current[idx] = el)}
              value={otp[idx]}
              onChange={(e) => handleChange(idx, e.target.value.slice(-1))}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={1}
              disabled={isVerifying}
              className="font-Inter w-full max-w-[60px] bg-transparent px-2 text-center text-base font-normal text-neutral-700 outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:w-16 sm:px-3 md:w-20 md:px-4 lg:w-24"
              aria-label={`Digit ${idx + 1} of verification code`}
            />
          </div>
        ))}
      </div>

      <div
        className="font-Inter justify-start self-stretch text-center text-base font-medium text-zinc-900"
        aria-live="polite"
      >
        {mm}:{ss}
      </div>

      <button
        type="button"
        onClick={handleResend}
        disabled={!canResend || isVerifying}
        className={`font-Inter justify-start self-stretch text-center text-base font-medium ${canResend && !isVerifying ? "text-neutral-900" : "cursor-not-allowed text-neutral-400"}`}
      >
        Resend Code
      </button>

      <button
        type="submit"
        disabled={!isOtpComplete || isVerifying}
        className={`inline-flex items-center justify-center gap-2 self-stretch overflow-hidden rounded-lg px-7 py-3 ${!isOtpComplete || isVerifying ? "cursor-not-allowed bg-sky-700 opacity-50" : "bg-sky-700 hover:bg-sky-800"}`}
      >
        <span className="font-Inter justify-start text-base leading-tight font-medium text-white">
          Confirm
        </span>
      </button>
    </form>
  );
}
