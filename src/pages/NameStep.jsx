import { useState } from "react";
import { useWizard } from "../context/WizardContext.jsx";
import WizardStepLayout from "../components/WizardStepLayout.jsx";
import FieldInput from "../components/FieldInput.jsx";
import { validateName } from "../utils/validators.js";

export default function NameStep() {
  const { data, setField, goTo, goBack } = useWizard();
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  function handleChange(value) {
    setField("name", value);
    if (touched) setError(validateName(value));
  }

  function handleNext() {
    const err = validateName(data.name);
    setTouched(true);
    setError(err);
    if (err) return;
    goTo("dob");
  }

  return (
    <WizardStepLayout screen="name" title="What should we call you?" onNext={handleNext} onBack={goBack}>
      <FieldInput
        label="Name"
        value={data.name}
        onChange={handleChange}
        onBlur={() => { setTouched(true); setError(validateName(data.name)); }}
        error={touched ? error : null}
        helper="Shown on your profile. Cannot be changed later."
        maxLength={40}
        autoFocus
      />
    </WizardStepLayout>
  );
}
