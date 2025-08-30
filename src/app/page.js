"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "../../public/deepcarve_logo.svg";

export default function Home() {
  // --- OTP state ---
  const OTP_LENGTH = 4;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputsRef = useRef([]);
  const [secondsLeft, setSecondsLeft] = useState(59);
  const canResend = secondsLeft === 0;

  useEffect(() => {
    if (secondsLeft === 0) return;
    const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [secondsLeft]);

  const handleChange = (idx, value) => {
    if (!/^\d?$/.test(value)) return; // numeric only, single char
    const next = [...otp];
    next[idx] = value;
    setOtp(next);

    // move focus forward on entry
    if (value && idx < OTP_LENGTH - 1) {
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
    if (e.key === "ArrowRight" && idx < OTP_LENGTH - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = pasted.split("");
    while (next.length < OTP_LENGTH) next.push("");
    setOtp(next);
    // focus last filled cell
    const last = Math.min(pasted.length, OTP_LENGTH) - 1;
    inputsRef.current[last >= 0 ? last : 0]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    alert(`OTP Code: ${code}`);
  };

  const handleResend = () => {
    if (!canResend) return;
    // TODO: trigger resend
    setSecondsLeft(140);
    setOtp(Array(OTP_LENGTH).fill(""));
    inputsRef.current[0]?.focus();
  };

  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
  const ss = String(secondsLeft % 60).padStart(2, "0");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-50">
      <div className="mx-auto flex min-h-screen w-full max-w-screen-xl flex-col p-12">
        <header className="flex items-center">
          <Image src={logo} alt="Deepcarve Logo" width={200} height={150} priority />
        </header>

        <main className="flex-1 overflow-auto">
          <div className="flex min-h-[80vh] flex-col gap-6 md:flex-row">
            {/* Left column: hero text */}
            <div className="flex items-center justify-start sm:items-start sm:justify-start md:items-center md:justify-center md:pt-12 md:pb-16 lg:flex-1 lg:items-center lg:justify-center">
              <div className="font-archivo text-3xl font-normal text-emerald-950 sm:text-4xl md:text-5xl lg:text-6xl">
                We&apos;re on a mission to
                <br />
                help memorialist
              </div>
            </div>

            {/* Right column: OTP card */}
            <div className="flex min-h-fit sm:items-start sm:justify-start md:items-center md:justify-center lg:flex-1 lg:items-center lg:justify-center">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col items-start justify-center gap-3 rounded-xl bg-white p-5"
                aria-labelledby="otp-title"
              >
                <h1
                  id="otp-title"
                  className="font-Inter justify-start self-stretch text-3xl font-medium text-zinc-900"
                >
                  Enter OTP Code
                </h1>

                <p className="justify-start self-stretch">
                  <span className="font-Inter text-lg leading-none font-medium text-zinc-900/70">
                    Enter code that has been sent to{" "}
                  </span>
                  <span className="font-Inter text-lg leading-none font-medium text-zinc-900">
                    email
                  </span>
                </p>

                <label
                  htmlFor="otp-0"
                  className="font-Inter sr-only justify-center pt-2 text-base font-medium text-zinc-500"
                >
                  Enter Code
                </label>
                {/* OTP Inputs */}
                <div className="inline-flex h-14 items-start justify-start gap-1 self-stretch">
                  {Array.from({ length: OTP_LENGTH }).map((_, idx) => (
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
                        className="font-Inter w-full max-w-[60px] bg-transparent px-2 text-center text-base font-normal text-neutral-700 outline-none sm:w-16 sm:px-3 md:w-20 md:px-4 lg:w-24"
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
                  disabled={!canResend}
                  className={`font-Inter justify-start self-stretch text-center text-base font-medium ${canResend ? "text-neutral-900" : "cursor-not-allowed text-neutral-400"}`}
                >
                  Resend Code
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 self-stretch overflow-hidden rounded-lg bg-sky-700 px-7 py-3"
                >
                  <span className="font-Inter justify-start text-base leading-tight font-medium text-white">
                    Confirm
                  </span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
