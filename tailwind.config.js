/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Poppins", "system-ui", "sans-serif"] },
      colors: {
        accent: { DEFAULT: "#8B5CF6" },
        glow: { DEFAULT: "#22D3EE" },
      },
      keyframes: {
        "slide-in": {
          "0%": { opacity: 0, transform: "translateX(16px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-6px)" },
          "75%": { transform: "translateX(6px)" },
        },
        "wave-move": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "float": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(12px, -16px) scale(1.06)" },
        },
        "pop-in": {
          "0%": { opacity: 0, transform: "scale(0.9)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        "step-in": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "slide-in": "slide-in 0.28s ease-out",
        "shake": "shake 0.3s ease-in-out",
        "wave-slow": "wave-move 16s linear infinite",
        "wave-fast": "wave-move 9s linear infinite reverse",
        "float-slow": "float 8s ease-in-out infinite",
        "float-slower": "float 11s ease-in-out infinite",
        "pop-in": "pop-in 0.2s ease-out",
        "step-in": "step-in 0.32s ease-out",
      },
    },
  },
  plugins: [],
};
