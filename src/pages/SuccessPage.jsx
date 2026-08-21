import { PartyPopper } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import { PrimaryButton } from "../components/Buttons.jsx";

export default function SuccessPage() {
  const { data, goTo } = useWizard();

  return (
    <div className="flex h-full flex-col justify-between bg-gradient-to-b from-accent via-fuchsia-600 to-glow px-6 pb-8 pt-16 text-center">
      <div>
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-black text-white">
          <PartyPopper className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">You're in, {data.name || "friend"}!</h1>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-white/90">
          Your profile is set up as <strong>@{data.username || "you"}</strong>. Time to find your next hangout.
        </p>

        <div className="mx-auto mt-8 max-w-xs rounded-2xl bg-black/90 p-5 text-left text-white">
          <p className="text-xs font-bold uppercase tracking-wide text-white/50">Profile summary</p>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Name" value={data.name} />
            <Row label="Username" value={`@${data.username}`} />
            <Row label="Pronouns" value={data.pronouns.join(" / ") || "—"} />
            <Row label="Invite code" value={data.inviteCode || "None"} />
          </dl>
        </div>
      </div>

      <PrimaryButton onClick={() => goTo("home")}>Start Exploring</PrimaryButton>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-white/50">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
