import { useWizard } from "./context/WizardContext.jsx";
import AppShell from "./components/AppShell.jsx";
import Toast from "./components/Toast.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import LocationPage from "./pages/LocationPage.jsx";
import SignupIntroPage from "./pages/SignupIntroPage.jsx";
import EmailStep from "./pages/EmailStep.jsx";
import OtpStep from "./pages/OtpStep.jsx";
import UsernameStep from "./pages/UsernameStep.jsx";
import NameStep from "./pages/NameStep.jsx";
import DobStep from "./pages/DobStep.jsx";
import PronounsStep from "./pages/PronounsStep.jsx";
import InviteStep from "./pages/InviteStep.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";

const SCREENS = {
  landing: LandingPage,
  terms: TermsPage,
  location: LocationPage,
  "signup-intro": SignupIntroPage,
  email: EmailStep,
  otp: OtpStep,
  username: UsernameStep,
  name: NameStep,
  dob: DobStep,
  pronouns: PronounsStep,
  invite: InviteStep,
  success: SuccessPage,
  home: DashboardPage,
};

export default function App() {
  const { screen } = useWizard();
  const Screen = SCREENS[screen] || LandingPage;

  return (
    <AppShell>
      <Toast />
      <div key={screen} className="h-full animate-step-in">
        <Screen />
      </div>
    </AppShell>
  );
}
