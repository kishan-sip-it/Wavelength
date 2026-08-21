export default function FieldInput({
  label, value, onChange, onBlur, error, helper, placeholder,
  type = "text", maxLength, inputMode, autoFocus, max,
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-white/70">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        autoFocus={autoFocus}
        max={max}
        className={`w-full rounded-xl border bg-transparent px-4 py-3.5 text-base text-white outline-none transition placeholder:text-white/30 ${
          error ? "border-red-500 animate-shake" : "border-white/25 focus:border-white"
        }`}
      />
      {error ? (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      ) : helper ? (
        <p className="mt-2 text-xs leading-5 text-white/50">{helper}</p>
      ) : null}
    </div>
  );
}
