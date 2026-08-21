import WizardHeader from "./WizardHeader.jsx";
import { PrimaryButton, OutlineButton } from "./Buttons.jsx";

export default function WizardStepLayout({ screen, title, children, onNext, onBack, nextDisabled, loading, nextLabel = "Next" }) {
  return (
    <div className="flex h-full flex-col bg-black pb-8">
      <WizardHeader screen={screen} />
      <h1 className="mt-8 px-6 text-2xl font-extrabold leading-snug text-white">{title}</h1>
      <div className="mt-6 flex-1 overflow-y-auto px-6">{children}</div>
      <div className="space-y-3 px-6">
        <PrimaryButton onClick={onNext} disabled={nextDisabled} loading={loading}>
          {nextLabel}
        </PrimaryButton>
        <OutlineButton onClick={onBack}>Back</OutlineButton>
      </div>
    </div>
  );
}
