export default function Logo({ size = "text-3xl" }) {
  return (
    <span className={`inline-flex items-center gap-1.5 font-extrabold tracking-tight text-white ${size}`}>
      Wavelength
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
    </span>
  );
}
