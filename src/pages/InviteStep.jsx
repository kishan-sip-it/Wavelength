import { useState } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import Logo from "../components/Logo.jsx";
import { PrimaryButton, OutlineButton } from "../components/Buttons.jsx";
import FieldInput from "../components/FieldInput.jsx";
import { validateInviteCode } from "../utils/validators.js";

const COPY_LINES = [
  [["One more thing before you ", false], ["turn up", true], [".", false]],
  [["Ghosting is for ", false], ["Halloween", true], [".", false]],
  [["Outfits loud, ", false], ["intentions", true], [" clear.", false]],
  [["Joining is free. Hosting is ", false], ["also", true], [" free.", false]],
];

export default function InviteStep() {
  const { data, setField, goBack, goTo, isSubmitting, setSubmitting, showToast } = useWizard();
  const [error, setError] = useState(null);

  function handleChange(value) {
    setField("inviteCode", value);
    if (error) setError(validateInviteCode(value));
  }

  async function handleSignUp() {
    const err = validateInviteCode(data.inviteCode);
    setError(err);
    if (err) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1100));
    setSubmitting(false);
    showToast("success", "Welcome aboard!");
    goTo("success");
  }

  return (
    <div className="flex h-full flex-col bg-black pb-8 pt-6">
      <div className="px-6"><Logo size="text-2xl" /></div>

      <div className="mt-8 flex-1 overflow-y-auto px-6">
        <p className="text-xl font-extrabold uppercase leading-snug tracking-tight">
          {COPY_LINES.map((line, i) => (
            <span key={i}>
              {line.map(([text, accentText], j) => (
                <span key={j} className={accentText ? "text-accent" : "text-white/70"}>
                  {text}
                </span>
              ))}
              <br />
            </span>
          ))}
        </p>

        <div className="mt-6">
          <FieldInput
            label="Enter invite code (optional)"
            value={data.inviteCode}
            onChange={handleChange}
            onBlur={() => setError(validateInviteCode(data.inviteCode))}
            error={error}
            helper="Have a friend's code? Enter it for bonus perks."
            maxLength={12}
          />
        </div>
      </div>

      <div className="space-y-3 px-6">
        <PrimaryButton onClick={handleSignUp} loading={isSubmitting}>
          Sign Up
        </PrimaryButton>
        <OutlineButton onClick={goBack}>Back</OutlineButton>
      </div>
    </div>
  );
}
