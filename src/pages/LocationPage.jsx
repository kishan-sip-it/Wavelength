import { useState } from "react";
import { MapPin } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";
import Logo from "../components/Logo.jsx";

export default function LocationPage() {
  const { goTo } = useWizard();
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  function handleAllow() {
    setShowPermissionModal(false);
    goTo("signup-intro");
  }

  return (
    <div className="relative flex h-full flex-col bg-black px-6 pb-8 pt-6">
      <Logo size="text-2xl" />

      <div className="mt-10">
        <p className="text-2xl font-extrabold leading-snug text-white">
          We use your <span className="text-accent">location</span> to show you what's happening nearby.
        </p>
      </div>

      <div className="flex-1" />

      <div>
        <p className="mb-3 text-xs text-white/50">Taking longer than expected. Please check permissions.</p>
        <PrimaryButton onClick={() => setShowPermissionModal(true)}>Enable Location</PrimaryButton>
      </div>

      {showPermissionModal && (
        <div className="absolute inset-0 z-50 flex items-end bg-black/60">
          <div className="w-full rounded-t-3xl bg-neutral-800 px-6 pb-8 pt-3 text-center">
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/20" />
            <MapPin className="mx-auto mb-3 h-8 w-8 text-white/70" />
            <p className="text-base text-white">Allow <strong>Wavelength</strong> to access this device's location?</p>
            <div className="mt-6 space-y-3">
              <button onClick={handleAllow} className="w-full text-sm font-semibold text-blue-400">While using the app</button>
              <button onClick={handleAllow} className="w-full text-sm font-semibold text-blue-400">Only this time</button>
              <button onClick={() => { setShowPermissionModal(false); goTo("signup-intro"); }} className="w-full text-sm font-semibold text-blue-400">
                Don't allow
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
