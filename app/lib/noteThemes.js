export const MOODS = ["🙂", "😄", "😔", "🥰", "😂", "😭", "😠", "🤬"];

export const NOTE_THEMES = [
  { id: "white", label: "Cloud", swatch: "bg-zinc-100" },
  { id: "pink", label: "Blush", swatch: "bg-pink-200" },
  { id: "red", label: "Cherry", swatch: "bg-rose-300" },
  { id: "blue", label: "Sky", swatch: "bg-sky-200" },
  { id: "green", label: "Mint", swatch: "bg-emerald-200" },
  { id: "yellow", label: "Sun", swatch: "bg-amber-200" },
];

export function noteSurface(theme) {
  const map = {
    red: "bg-gradient-to-br from-rose-50 to-rose-100/90 border-rose-200/70",
    blue: "bg-gradient-to-br from-sky-50 to-sky-100/90 border-sky-200/70",
    green: "bg-gradient-to-br from-emerald-50 to-emerald-100/90 border-emerald-200/70",
    pink: "bg-gradient-to-br from-pink-50 to-pink-100/90 border-pink-200/70",
    white: "bg-white border-zinc-200/80",
    yellow: "bg-gradient-to-br from-amber-50 to-amber-100/90 border-amber-200/70",
  };
  return map[theme] || map.white;
}
