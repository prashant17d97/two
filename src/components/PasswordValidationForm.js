import { useState } from "react";

/**
 * A form component that allows users to reset their password by entering a new password and confirming it. Includes basic validation for password length and confirmation.
 *
 * @param {Object} props - The properties passed to the ResetPasswordForm component.
 * @param {function(string):void} props.onSubmit - A callback function executed when the form is successfully submitted. Receives the new password as an argument.
 * @param {string} [props.title="Password Reset"] - An optional title displayed at the top of the form.
 * @param {number} [props.minLength=6] - The minimum length required for the password.
 * @return {JSX.Element} The rendered ResetPasswordForm component.
 */
export default function ResetPasswordForm({
  submitting,
  onSubmit,
  title = "Password Reset",
  minLength = 6,
}) {
  // --- State ---
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touchedPw, setTouchedPw] = useState(false);
  const [touchedConfirm, setTouchedConfirm] = useState(false);

  // --- Validation ---
  const pwLongEnough = password.length >= minLength;
  const pwMatches = confirm === password && confirm.length > 0;
  const pwError = touchedPw && !pwLongEnough;
  const confirmError = touchedConfirm && !pwMatches;
  const canSubmit = pwLongEnough && pwMatches && !submitting;

  // --- Handlers ---
  const handleSubmit = (e) => {
    e.preventDefault();
    setTouchedPw(true);
    setTouchedConfirm(true);
    if (!canSubmit) return;

    onSubmit && onSubmit(password);
    setShowPw(false);
    setShowConfirm(false);
  };

  const EyeIcon = ({ crossed = false }) => (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
      <circle cx="12" cy="12" r="3.5" />
      {crossed && <path d="M3 3l18 18" />}
    </svg>
  );

  return (
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
        {title}
      </h1>

      <p className="font-Inter justify-start text-lg leading-none font-medium text-zinc-900/70">
        The password should have at least 6 characters
      </p>

      <label className="font-Inter justify-center text-base font-medium text-zinc-500">
        New Password
      </label>

      <div>
        <div className="relative">
          <input
            id="new-password"
            name="new-password"
            type={showPw ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Input Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setTouchedPw(true)}
            aria-invalid={pwError}
            aria-describedby={pwError ? "pw-error" : null}
            className={`w-full rounded-2xl border px-4 py-3 pr-11 text-base text-[#878684] transition outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-600 ${
              pwError ? "border-red-500" : "border-zinc-200"
            }`}
          />
          <button
            type="button"
            aria-label={showPw ? "Hide password" : "Show password"}
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-zinc-500 hover:text-zinc-700"
          >
            <EyeIcon crossed={!showPw} />
          </button>
        </div>
        {pwError && (
          <p id="pw-error" className="mt-2 text-sm text-red-600">
            Must be at least {minLength} characters.
          </p>
        )}
      </div>

      <label className="font-Inter justify-center text-base font-medium text-zinc-500">
        Confirm Password
      </label>

      <div>
        <div className="relative">
          <input
            id="confirm-password"
            name="confirm-password"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Input Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouchedConfirm(true)}
            aria-invalid={confirmError}
            aria-describedby={confirmError ? "confirm-error" : undefined}
            className={`w-full rounded-2xl border px-4 py-3 pr-11 text-base text-[#878684] transition outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-sky-600 ${
              confirmError ? "border-red-500" : "border-zinc-200"
            }`}
          />
          <button
            type="button"
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute inset-y-0 right-3 flex items-center justify-center text-zinc-500 hover:text-zinc-700"
          >
            <EyeIcon crossed={!showConfirm} />
          </button>
        </div>
        {confirmError && (
          <p id="confirm-error" className="mt-2 text-sm text-red-600">
            Passwords must match.
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={!canSubmit}
        className={`mt-2 inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3 text-white transition ${
          !canSubmit
            ? "cursor-not-allowed bg-sky-700 opacity-60"
            : "cursor-pointer bg-sky-700 hover:bg-sky-800"
        }`}
      >
        <span className="text-base font-medium">Reset Password</span>
      </button>
    </form>
  );
}
