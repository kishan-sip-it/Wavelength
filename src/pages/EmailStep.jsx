import { useState } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import FieldInput from "../components/FieldInput.jsx";
import Logo from "../components/Logo.jsx";
import { validateEmail } from "../utils/validators.js";

export default function EmailStep() {
  const { data, setField, goTo, isSubmitting, setSubmitting } = useWizard();
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  function handleChange(value) {
    setField("email", value);
    if (touched) setError(validateEmail(value));
  }

  function handleBlur() {
    setTouched(true);
    setError(validateEmail(data.email));
  }

  async function handleProceed() {
    const err = validateEmail(data.email);
    setTouched(true);
    setError(err);
    if (err) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900)); // simulated network call
    setSubmitting(false);
    goTo("otp");
  }

  return (
    <div className="flex h-full flex-col bg-black px-6 pb-8 pt-6">
      <Logo size="text-2xl" />
      <h1 className="mt-10 text-2xl font-extrabold text-white">Enter your email</h1>

      <div className="mt-6">
        <FieldInput
          label="Email"
          type="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched ? error : null}
          placeholder="you@example.com"
          autoFocus
        />
      </div>

      <div className="flex-1" />

      <label className="mb-5 flex items-start gap-2.5 text-sm text-white/70">
        <input
          type="checkbox"
          checked={data.newsletter}
          onChange={(e) => setField("newsletter", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/30 bg-transparent accent-accent"
        />
        I'd like to subscribe to the newsletter
      </label>

      <PrimaryButton onClick={handleProceed} loading={isSubmitting}>
        Proceed
      </PrimaryButton>
    </div>
  );
}
