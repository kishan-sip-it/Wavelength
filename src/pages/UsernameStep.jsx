import { useState } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import WizardStepLayout from "../components/WizardStepLayout.jsx";
import FieldInput from "../components/FieldInput.jsx";
import { validateUsername } from "../utils/validators.js";

export default function UsernameStep() {
  const { data, setField, goTo, goBack, isSubmitting, setSubmitting } = useWizard();
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  function handleChange(value) {
    setField("username", value);
    if (touched) setError(validateUsername(value));
  }

  async function handleNext() {
    const err = validateUsername(data.username);
    setTouched(true);
    setError(err);
    if (err) return;

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 500)); // simulated availability check
    setSubmitting(false);
    goTo("name");
  }

  return (
    <WizardStepLayout screen="username" title="Create a username that fits your vibe" onNext={handleNext} onBack={goBack} loading={isSubmitting}>
      <FieldInput
        label="Username"
        value={data.username}
        onChange={handleChange}
        onBlur={() => { setTouched(true); setError(validateUsername(data.username)); }}
        error={touched ? error : null}
        helper="This is how people will find and remember you."
        maxLength={20}
        autoFocus
      />
    </WizardStepLayout>
  );
}
