import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import MountainDivider from "../components/MountainDivider.jsx";
import Logo from "../components/Logo.jsx";

export default function LandingPage() {
  const { goTo } = useWizard();

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-black">
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-float-slow absolute -left-10 top-0 h-72 w-72 rounded-full bg-orange-500 opacity-70 blur-3xl" />
        <div className="animate-float-slower absolute right-0 top-10 h-64 w-64 rounded-full bg-blue-500 opacity-70 blur-3xl" style={{ animationDelay: "1.5s" }} />
        <div className="animate-float-slow absolute left-1/3 top-16 h-56 w-56 rounded-full bg-fuchsia-500 opacity-60 blur-3xl" style={{ animationDelay: "3s" }} />
        <div className="animate-float-slower absolute right-4 top-40 h-52 w-52 rounded-full bg-teal-400 opacity-60 blur-3xl" style={{ animationDelay: "2s" }} />
        <MountainDivider />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-14">
        <div className="text-center">
          <Logo size="text-3xl" />
        </div>

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-white">An app for people who</p>
          <h1 className="mt-1 text-4xl font-extrabold uppercase tracking-tight text-white">Turn Up</h1>
          <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/90">
            <span className="font-semibold text-orange-300">Warning:</span> you may make new friends, dance without an
            exit plan, and lose track of time.
          </p>
        </div>

        <PrimaryButton onClick={() => goTo("terms")}>Continue</PrimaryButton>
      </div>
    </div>
  );
}
