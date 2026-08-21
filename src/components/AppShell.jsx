export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 sm:p-6">
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-black text-white sm:h-[860px] sm:max-h-[92vh] sm:w-[420px] sm:rounded-[2.5rem] sm:border sm:border-white/10 sm:shadow-2xl">
        {children}
      </div>
    </div>
  );
}
