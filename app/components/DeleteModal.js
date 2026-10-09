"use client";

import { motion } from "framer-motion";

export default function DeleteModal({ open, loading, onConfirm, onCancel }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-sm rounded-3xl border border-white/60 bg-white p-8 text-center shadow-2xl shadow-rose-200/30"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-2xl">
          🗑️
        </div>
        <h2 className="font-display text-xl font-semibold text-ink">Delete this note?</h2>
        <p className="mt-2 text-sm text-muted">
          It will be gone for good — no undo.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="btn-danger min-w-[5.5rem]"
          >
            {loading ? (
              <img src="/loading.gif" alt="" className="h-6 w-auto mx-auto" />
            ) : (
              "Delete"
            )}
          </button>
          <button type="button" onClick={onCancel} className="btn-ghost">
            Keep it
          </button>
        </div>
      </motion.div>
    </div>
  );
}
