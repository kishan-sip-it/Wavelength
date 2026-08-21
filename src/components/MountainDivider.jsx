export default function MountainDivider() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 h-2/3 w-full"
      viewBox="0 0 400 500"
      preserveAspectRatio="none"
    >
      <path fill="black">
        <animate
          attributeName="d"
          dur="4s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.45 0 0.55 1; 0.45 0 0.55 1; 0.45 0 0.55 1"
          values="
            M0,500 L0,260 Q140,120 200,220 T400,180 L400,500 Z;
            M0,500 L0,280 Q140,150 200,195 T400,205 L400,500 Z;
            M0,500 L0,235 Q140,95 200,245 T400,150 L400,500 Z;
            M0,500 L0,260 Q140,120 200,220 T400,180 L400,500 Z"
        />
      </path>
    </svg>
  );
}
