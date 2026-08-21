import { Sparkles } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import Logo from "../components/Logo.jsx";

export default function SignupIntroPage() {
  const { goTo } = useWizard();

  return (
    <div className="flex h-full flex-col justify-between bg-black px-6 pb-8 pt-6">
      <Logo size="text-2xl" />

      <div className="text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15 text-accent">
          <Sparkles className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">You need an account</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/60">
          Create an account to join events, earn rewards, and meet people near you — all for free.
        </p>
      </div>

      <PrimaryButton onClick={() => goTo("email")}>Get Started</PrimaryButton>
    </div>
  );
}
