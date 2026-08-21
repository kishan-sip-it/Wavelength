import { useState } from "react";
import { Check } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import WizardStepLayout from "../components/WizardStepLayout.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import { validatePronouns } from "../utils/validators.js";

const OPTIONS = ["he", "him", "his", "she", "her", "hers", "they", "them", "theirs", "ze", "zir", "zirs", "ve", "ver", "vis"];
const MAX_SELECTIONS = 3;

function Chip({ label, selected, disabled, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled && !selected}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition-all ${
        selected
          ? "border-transparent bg-gradient-to-r from-accent to-glow text-white shadow-[0_0_18px_rgba(139,92,246,0.5)]"
          : "border-white/20 text-white/70 hover:border-white/40 disabled:opacity-30"
      }`}
    >
      {selected && <Check className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

export default function PronounsStep() {
  const { data, setField, goTo, goBack, showToast } = useWizard();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState(data.pronouns);
  const [error, setError] = useState(null);

  function openSheet() {
    setDraft(data.pronouns);
    setSheetOpen(true);
  }

  function toggleOption(option) {
    setDraft((prev) => {
      if (prev.includes(option)) return prev.filter((p) => p !== option);
      if (prev.length >= MAX_SELECTIONS) {
        showToast("error", `You can only select up to ${MAX_SELECTIONS} pronouns.`);
        return prev;
      }
      return [...prev, option];
    });
  }

  function handleSheetProceed() {
    setField("pronouns", draft);
    setError(null);
    setSheetOpen(false);
  }

  function handleNext() {
    const err = validatePronouns(data.pronouns);
    setError(err);
    if (err) return;
    goTo("invite");
  }

  const atLimit = draft.length >= MAX_SELECTIONS;

  return (
    <WizardStepLayout screen="pronouns" title="Which pronouns feel right for you?" onNext={handleNext} onBack={goBack}>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">Pronouns</label>
      <button
        onClick={openSheet}
        className={`w-full rounded-xl border bg-transparent px-4 py-3.5 text-left text-base outline-none transition ${
          error ? "border-red-500" : "border-white/25"
        } ${data.pronouns.length ? "text-white" : "text-white/30"}`}
      >
        {data.pronouns.length ? data.pronouns.join(" / ") : "Tap to select"}
      </button>
      {error ? (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      ) : (
        <p className="mt-2 text-xs leading-5 text-white/50">Select the pronouns that feel right for you.</p>
      )}

      {sheetOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:absolute">
          <div className="flex max-h-[85%] w-full max-w-[420px] flex-col rounded-t-3xl border-t border-white/10 bg-neutral-900 px-6 pb-6 pt-4">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-white/20" />
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-extrabold text-white">Select pronouns</h2>
                <p className="text-xs text-white/40">
                  {draft.length}/{MAX_SELECTIONS} selected
                </p>
              </div>
              <button onClick={() => setSheetOpen(false)} className="text-2xl text-white/50">×</button>
            </div>

            <div className="mt-5 flex-1 overflow-y-auto">
              <div className="flex flex-wrap gap-2.5">
                {OPTIONS.map((option) => (
                  <Chip
                    key={option}
                    label={option}
                    selected={draft.includes(option)}
                    disabled={atLimit}
                    onClick={() => toggleOption(option)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5">
              <PrimaryButton onClick={handleSheetProceed} disabled={draft.length === 0}>
                Proceed
              </PrimaryButton>
            </div>
            <button className="mt-4 text-center text-sm text-white/40 underline">Did we miss anything?</button>
          </div>
        </div>
      )}
    </WizardStepLayout>
  );
}
