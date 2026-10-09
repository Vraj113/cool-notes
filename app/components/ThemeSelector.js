"use client";

import { NOTE_THEMES } from "@/app/lib/noteThemes";

export default function ThemeSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Note color">
      {NOTE_THEMES.map((theme) => {
        const selected = value === theme.id;
        return (
          <button
            key={theme.id}
            type="button"
            title={theme.label}
            onClick={() => onChange(theme.id)}
            className={`h-8 w-8 rounded-full border-2 transition ${theme.swatch} ${
              selected
                ? "border-rose-500 ring-2 ring-rose-200 scale-110"
                : "border-white/80 hover:scale-105"
            }`}
            aria-pressed={selected}
            aria-label={theme.label}
          />
        );
      })}
    </div>
  );
}
