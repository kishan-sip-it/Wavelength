import Logo from "./Logo.jsx";

const STEP_ORDER = ["username", "name", "dob", "pronouns"];

export default function WizardHeader({ screen }) {
  const stepIndex = STEP_ORDER.indexOf(screen);

  return (
    <div className="flex items-center justify-between px-6 pt-6">
      <Logo size="text-2xl" />
      {stepIndex >= 0 && (
        <div className="text-right">
          <p className="text-xs font-bold uppercase tracking-widest text-white/90">
            Step {stepIndex + 1} of {STEP_ORDER.length}
          </p>
          <div className="mt-1.5 flex justify-end gap-1">
            {STEP_ORDER.map((s, i) => (
              <span key={s} className={`h-1 w-4 rounded-full transition-colors ${i <= stepIndex ? "bg-accent" : "bg-white/15"}`} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
