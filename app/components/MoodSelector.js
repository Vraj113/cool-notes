"use client";

import { MOODS } from "@/app/lib/noteThemes";

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5" role="group" aria-label="Mood">
      {MOODS.map((mood) => {
        const selected = value === mood;
        return (
          <button
            key={mood}
            type="button"
            onClick={() => onChange(mood)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition ${
              selected
                ? "bg-white shadow-md ring-2 ring-rose-300 scale-105"
                : "bg-white/50 hover:bg-white/80 hover:scale-105"
            }`}
            aria-pressed={selected}
            aria-label={`Mood ${mood}`}
          >
            {mood}
          </button>
        );
      })}
    </div>
  );
}
