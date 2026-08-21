import { useState, useRef, useEffect } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton, OutlineButton } from "../components/Buttons.jsx";
import Logo from "../components/Logo.jsx";

const OTP_LENGTH = 6;
const DEMO_CODE = "123456"; // frontend-only exercise, no real email delivery — see README
const RESEND_COOLDOWN = 30;

export default function OtpStep() {
  const { data, goTo, goBack, isSubmitting, setSubmitting, showToast } = useWizard();
  const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState(false);
  const [cooldown, setCooldown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  function updateDigit(index, value) {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError(false);
    if (value && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) inputRefs.current[index - 1]?.focus();
  }

  function handlePaste(e) {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    e.preventDefault();
    const next = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((d, i) => (next[i] = d));
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  }

  async function handleVerify() {
    const code = digits.join("");
    if (code.length < OTP_LENGTH) {
      setError(true);
      showToast("error", "Enter all 6 digits.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);

    if (code !== DEMO_CODE) {
      setError(true);
      setDigits(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
      showToast("error", "That code isn't right. Please try again.");
      return;
    }
    goTo("username");
  }

  function handleResend() {
    if (cooldown > 0) return;
    setCooldown(RESEND_COOLDOWN);
    setDigits(Array(OTP_LENGTH).fill(""));
    setError(false);
    inputRefs.current[0]?.focus();
    showToast("success", "A new code has been sent.");
  }

  return (
    <div className="flex h-full flex-col bg-black px-6 pb-8 pt-6">
      <div className="text-center"><Logo size="text-2xl" /></div>
      <h1 className="mt-10 text-center text-lg font-bold uppercase tracking-wide text-white">Enter OTP</h1>

      <div className="mt-8 flex justify-center gap-2.5" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => updateDigit(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className={`h-14 w-11 rounded-xl border-2 bg-transparent text-center text-xl font-bold text-white outline-none transition ${
              error ? "animate-shake border-red-500" : digit ? "border-accent" : "border-white/25"
            }`}
          />
        ))}
      </div>

      <div className="mt-4 text-right">
        <button onClick={handleResend} disabled={cooldown > 0} className={`text-sm font-medium ${cooldown > 0 ? "text-white/30" : "text-accent underline"}`}>
          {cooldown > 0 ? `Resend OTP in 0:${String(cooldown).padStart(2, "0")}` : "Resend OTP"}
        </button>
      </div>

      <div className="flex-1" />

      <div className="space-y-3">
        <PrimaryButton onClick={handleVerify} loading={isSubmitting}>Verify</PrimaryButton>
        <OutlineButton onClick={goBack}>Go Back</OutlineButton>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/40">
        A 6-digit OTP has been sent to <strong className="text-white/60">{data.email}</strong>.
      </p>
      <p className="mt-2 rounded-lg bg-accent/10 px-3 py-2 text-xs text-accent">
        Demo mode — no real email is sent. Use code <strong>{DEMO_CODE}</strong> to continue.
      </p>
    </div>
  );
}
