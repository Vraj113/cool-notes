"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session } = useSession();
  const [quote, setQuote] = useState({ text: "", author: "" });
  const router = useRouter();

  const name = session?.user?.name || "Friend";
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    fetch("/api/quotes")
      .then((res) => res.json())
      .then(setQuote)
      .catch(() => {});
  }, []);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-white/50 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-400 to-fuchsia-500 text-lg shadow-md shadow-rose-200/50">
            ✨
          </div>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold leading-tight text-ink">
              Cute Notes
            </p>
            <p className="truncate text-xs text-muted">Hi, {name}</p>
          </div>
        </div>

        {quote.text && (
          <blockquote className="hidden max-w-md flex-1 text-center md:block">
            <p className="font-display text-sm italic leading-snug text-ink/80">
              &ldquo;{quote.text}&rdquo;
            </p>
            <cite className="mt-0.5 block text-[10px] font-medium not-italic uppercase tracking-wider text-muted">
              {quote.author}
            </cite>
          </blockquote>
        )}

        <div className="flex shrink-0 items-center gap-2">
          <div
            className="hidden h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-sm font-semibold text-rose-700 sm:flex"
            title={name}
          >
            {initial}
          </div>
          <button type="button" onClick={handleSignOut} className="btn-ghost py-2 text-xs">
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
