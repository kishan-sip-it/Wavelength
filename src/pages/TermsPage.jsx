import { useState } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import Logo from "../components/Logo.jsx";

export default function TermsPage() {
  const { goTo } = useWizard();
  const [showFullTerms, setShowFullTerms] = useState(false);

  return (
    <div className="relative flex h-full flex-col bg-black px-6 pb-8 pt-6">
      <Logo size="text-2xl" />

      <div className="mt-10 flex-1 overflow-y-auto">
        <p className="text-xl font-extrabold uppercase leading-snug text-white">
          By joining, you agree to keep things fun, safe, and drama-free. Respect is non-negotiable — treat everyone the
          way you'd want to be treated. Show up with good <span className="text-accent">energy</span> and expect the same
          back. Let's make every hangout one worth remembering, for the right reasons.
        </p>
      </div>

      <div>
        <p className="mb-3 text-xs text-white/50">
          To proceed, accept{" "}
          <button onClick={() => setShowFullTerms(true)} className="font-semibold text-white underline">
            Terms and Conditions
          </button>
        </p>
        <PrimaryButton onClick={() => goTo("location")}>Accept</PrimaryButton>
      </div>

      {showFullTerms && (
        <div className="absolute inset-0 z-50 flex flex-col bg-black/95 px-6 pb-8 pt-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Terms & Conditions</h2>
            <button onClick={() => setShowFullTerms(false)} className="text-2xl text-white/60">×</button>
          </div>
          <div className="mt-4 flex-1 space-y-3 overflow-y-auto text-sm leading-6 text-white/70">
            <p>1. Be respectful — harassment, hate speech, or unsafe behavior toward other members isn't tolerated.</p>
            <p>2. Events shown here are hosted by members, not by us. Attend at your own discretion.</p>
            <p>3. You must be 18 or older to create an account.</p>
            <p>4. Your location is used only to suggest nearby events and is never shared without consent.</p>
            <p>5. We may suspend accounts that violate community guidelines.</p>
          </div>
          <PrimaryButton onClick={() => setShowFullTerms(false)}>Close</PrimaryButton>
        </div>
      )}
    </div>
  );
}
