import { useState } from "react";
import { ShieldAlert, PartyPopper } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import WizardStepLayout from "../components/WizardStepLayout.jsx";
import { validateDob, calculateAge } from "../utils/validators.js";

const TODAY = new Date().toISOString().split("T")[0];

export default function DobStep() {
  const { data, setField, goTo, goBack, showToast } = useWizard();
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  const derivedAge = calculateAge(data.dob);

  function handleChange(value) {
    setField("dob", value);
    if (touched) setError(validateDob(value));
  }

  function handleNext() {
    const err = validateDob(data.dob);
    setTouched(true);
    setError(err);
    if (err) {
      if (err.includes("18 or older")) showToast("error", "You must be 18+ to continue.");
      return;
    }
    goTo("pronouns");
  }

  const isUnderage = touched && error && error.includes("18 or older");
  const isValidAndEligible = !error && data.dob && derivedAge !== null;

  return (
    <WizardStepLayout screen="dob" title="When's your birthday?" onNext={handleNext} onBack={goBack}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">Date of birth</label>
      <input
        type="date"
        value={data.dob}
        max={TODAY}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => { setTouched(true); setError(validateDob(data.dob)); }}
        className={`w-full rounded-xl border bg-transparent px-4 py-3.5 text-base text-white outline-none transition ${
          touched && error ? "border-red-500 animate-shake" : "border-white/25 focus:border-white"
        }`}
      />

      {touched && error ? (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      ) : (
        <p className="mt-2 text-xs leading-5 text-white/50">We use this to verify you're eligible — never shown on your profile.</p>
      )}

      {/* Cross-field dependency: this line only appears once a valid DOB is
          entered, and its value is derived live from that single field. */}
      {isValidAndEligible && (
        <div className="animate-pop-in mt-4 flex items-center gap-2.5 rounded-xl border border-accent/30 bg-accent/10 p-3.5">
          <PartyPopper className="h-4 w-4 shrink-0 text-accent" />
          <p className="text-sm text-white">
            You'll be turning up as a <strong>{derivedAge}-year-old</strong>. Nice.
          </p>
        </div>
      )}

      {isUnderage && (
        <div className="animate-pop-in mt-4 flex gap-2.5 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
          <p className="text-xs leading-5 text-red-300">
            This app connects you with strangers at real-world events, so everyone must be 18 or older. This check keeps
            the community safe.
          </p>
        </div>
      )}
    </WizardStepLayout>
  );
}
