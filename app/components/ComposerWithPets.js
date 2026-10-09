"use client";

import PetParade from "./PetParade";

export default function ComposerWithPets({ children, surfaceClass }) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className="relative">
        <div className="absolute inset-x-0 -top-2 z-20 flex justify-center px-2">
          <PetParade size="md" className="-mb-10 md:-mb-12" />
        </div>

        <div
          className={`relative z-10 overflow-hidden rounded-[1.75rem] border shadow-soft ${surfaceClass}`}
        >
          <div className="border-b border-white/70 bg-gradient-to-r from-rose-50/90 via-white/80 to-violet-50/90 px-5 py-3 pt-14 md:pt-16">
            <p className="text-center font-hand text-sm text-rose-600/90 md:text-base">
              Your writing buddies are cheering you on
            </p>
          </div>

          <div className="p-6 md:p-8">{children}</div>

          <div className="flex justify-center gap-1 border-t border-white/60 bg-white/40 px-4 py-3 opacity-90">
            <PetCorner src="/chick.png" className="-rotate-6" />
            <PetCorner src="/bunny.png" className="rotate-3" />
            <span className="mx-2 self-center text-[10px] font-medium uppercase tracking-widest text-muted">
              stay cozy
            </span>
            <PetCorner src="/puppy.png" className="-rotate-3" />
            <PetCorner src="/penguin.png" className="rotate-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

function PetCorner({ src, className = "" }) {
  return (
    <img
      alt=""
      src={src}
      className={`h-8 w-auto opacity-80 md:h-10 ${className}`}
    />
  );
}
