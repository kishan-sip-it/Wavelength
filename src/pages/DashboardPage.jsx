import { Bell, MessageCircle, MapPin, Clock, Calendar, RotateCcw } from "lucide-react";
import { useWizard } from "../context/WizardContext.jsx";
import Logo from "../components/Logo.jsx";

function EventCard({ title, host, tag, time, date, location }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-accent/40">
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <div className="h-8 w-8 shrink-0 rounded-md bg-gradient-to-br from-accent to-glow" />
      </div>
      <div className="mt-1 flex items-center justify-between">
        <p className="text-sm text-white/40">@{host}</p>
        <span className="rounded-full bg-accent/90 px-3 py-1 text-xs font-bold text-white">{tag}</span>
      </div>
      <div className="mt-3 grid grid-cols-2 divide-x divide-white/10 rounded-xl border border-white/10 text-sm">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-white/80">{time}</span>
          <Clock className="h-3.5 w-3.5 text-white/40" />
        </div>
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-white/80">{date}</span>
          <Calendar className="h-3.5 w-3.5 text-white/40" />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm text-white/70">
        <span className="truncate pr-2">{location}</span>
        <MapPin className="h-3.5 w-3.5 shrink-0 text-white/40" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data, reset } = useWizard();

  return (
    <div className="flex h-full flex-col bg-black">
      <div className="flex items-center justify-between px-6 pt-6">
        <Logo size="text-xl" />
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-white/70" />
          <MessageCircle className="h-5 w-5 text-white/70" />
        </div>
      </div>

      <div className="px-6 pt-6">
        <p className="text-sm text-white/40">Welcome back,</p>
        <h1 className="text-xl font-extrabold text-white">@{data.username || "you"}</h1>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-6 pt-5">
        <EventCard title="Rooftop Sunset Mixer" host="mira" tag="🌇 Sunset" time="7:30 PM" date="14/09/26" location="Skyline Terrace, Downtown" />
        <EventCard title="Beats & Board Games" host="jamal" tag="🎲 Games" time="8:00 PM" date="16/09/26" location="The Loft, 2nd Ave" />
        <EventCard title="Late Night Jam" host="priya" tag="🎸 Music" time="10:15 PM" date="20/09/26" location="Basement Studio, Pij Rd" />
      </div>

      <div className="flex justify-center px-6 py-5">
        <button
          onClick={reset}
          className="flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/70 hover:bg-white/5"
        >
          <RotateCcw className="h-4 w-4" />
          Restart demo
        </button>
      </div>
    </div>
  );
}
