"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import ComposerWithPets from "./components/ComposerWithPets";
import MoodSelector from "./components/MoodSelector";
import ThemeSelector from "./components/ThemeSelector";
import DeleteModal from "./components/DeleteModal";
import { noteSurface } from "@/app/lib/noteThemes";

const emptyForm = {
  title: "",
  content: "",
  mood: "🙂",
  theme: "white",
};

export default function Home() {
  const [notes, setNotes] = useState(null);
  const [data, setData] = useState(emptyForm);
  const [deleteBox, setDeleteBox] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [addNoteLoading, setAddNoteLoading] = useState(false);
  const [notesError, setNotesError] = useState(null);

  const getNotes = async () => {
    setNotesError(null);
    try {
      const response = await fetch("/api/notes", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
      });
      const payload = await response.json();
      if (!response.ok) {
        setNotes({ notes: [] });
        setNotesError(
          [payload.message, payload.detail].filter(Boolean).join(" — ") ||
            "Could not load notes"
        );
        return;
      }
      setNotes({ notes: Array.isArray(payload.notes) ? payload.notes : [] });
    } catch {
      setNotes({ notes: [] });
      setNotesError("Could not reach the server. Check your connection.");
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!data.title.trim() || !data.content.trim()) return;

    setAddNoteLoading(true);
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await getNotes();
    setAddNoteLoading(false);
    setData({ ...emptyForm, theme: data.theme, mood: data.mood });
  };

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    const res = await fetch("/api/notes", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    document.body.style.overflow = "auto";
    const result = await res.json();
    if (result.success) {
      setDeleteBox(false);
      setDeleteLoading(false);
      getNotes();
    }
  };

  const formatDate = (isoString) => {
    return new Date(isoString).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const noteList = notes?.notes ?? [];
  const hasNotes = noteList.length > 0;

  return (
    <>
      <Navbar />
      <DeleteModal
        open={deleteBox}
        loading={deleteLoading}
        onConfirm={() => handleDelete(noteIdToDelete)}
        onCancel={() => {
          setDeleteBox(false);
          document.body.style.overflow = "auto";
        }}
      />

      <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 md:px-6 md:pt-12">
        <section className="mb-14">
          <p className="section-label text-center">New entry</p>
          <h1 className="mt-1 text-center font-display text-3xl font-semibold text-ink md:text-4xl">
            What&apos;s on your mind?
          </h1>

          <div className="mt-10">
            <ComposerWithPets surfaceClass={noteSurface(data.theme)}>
            <form onSubmit={onSubmit}>
              <input
                className="input-field font-hand text-xl md:text-2xl font-medium"
                type="text"
                placeholder="Give it a title…"
                name="title"
                value={data.title}
                onChange={(e) => setData({ ...data, title: e.target.value })}
              />

              <textarea
                className="input-field mt-4 min-h-[220px] resize-none font-hand text-base leading-relaxed md:text-lg"
                placeholder="Pour your heart out…"
                name="content"
                value={data.content}
                onChange={(e) => setData({ ...data, content: e.target.value })}
              />

              <div className="mt-6 flex flex-col gap-5 border-t border-white/60 pt-6 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="section-label mb-2">Mood</p>
                  <MoodSelector
                    value={data.mood}
                    onChange={(mood) => setData({ ...data, mood })}
                  />
                </div>
                <div>
                  <p className="section-label mb-2">Paper color</p>
                  <ThemeSelector
                    value={data.theme}
                    onChange={(theme) => setData({ ...data, theme })}
                  />
                </div>
                <button
                  type="submit"
                  disabled={addNoteLoading}
                  className="btn-primary w-full md:w-auto md:min-w-[11rem]"
                >
                  {addNoteLoading ? (
                    <img src="/loading.gif" alt="" className="h-7 w-auto" />
                  ) : (
                    "Save note"
                  )}
                </button>
              </div>
            </form>
            </ComposerWithPets>
          </div>
        </section>

        <section>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="section-label">Archive</p>
              <h2 className="font-display text-2xl font-semibold text-ink md:text-3xl">
                Your notes
              </h2>
            </div>
            {hasNotes && (
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-muted shadow-sm">
                {noteList.length} saved
              </span>
            )}
          </div>

          {!notes && (
            <div className="glass-panel animate-pulse p-12 text-center text-muted">
              Loading your notes…
            </div>
          )}

          {notesError && (
            <p className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {notesError}
            </p>
          )}

          {notes && !hasNotes && (
            <div className="glass-panel flex flex-col items-center p-10 text-center md:p-12">
              <img
                src="/penguin.png"
                alt=""
                className="pet-peek h-24 w-auto md:h-28"
              />
              <p className="mt-4 font-display text-xl text-ink">No notes yet</p>
              <p className="mt-2 max-w-sm text-sm text-muted">
                Pip is keeping the page warm. Write your first note above!
              </p>
            </div>
          )}

          {hasNotes && (
            <ul className="grid gap-4 md:grid-cols-2">
              {noteList.map((note, index) => (
                <motion.li
                  key={note._id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className={`group relative border p-5 shadow-note transition hover:shadow-soft md:p-6 rounded-[1.25rem] ${noteSurface(note.theme)}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold text-rose-700">
                      {formatDate(note.postedOn)}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setNoteIdToDelete(note._id);
                        setDeleteBox(true);
                        document.body.style.overflow = "hidden";
                      }}
                      className="rounded-xl p-2 text-muted opacity-60 transition hover:bg-white/80 hover:text-rose-600 hover:opacity-100"
                      aria-label="Delete note"
                    >
                      <img src="/delete.png" alt="" className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-3 font-hand text-xl font-semibold text-ink md:text-2xl">
                    {note.title}
                    <span className="ml-2 inline-block">{note.mood}</span>
                  </h3>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/85 md:text-base">
                    {note.content}
                  </p>
                </motion.li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}
