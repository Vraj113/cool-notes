/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        blush: "var(--blush)",
        lavender: "var(--lavender)",
      },
      boxShadow: {
        soft: "0 8px 32px rgba(244, 114, 182, 0.12)",
        note: "0 4px 24px rgba(45, 42, 50, 0.06)",
      },
    },
  },
  plugins: [],
};
