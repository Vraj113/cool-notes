"use client";

import { motion } from "framer-motion";
import { WRITING_BUDDIES } from "@/app/lib/pets";

export default function PetParade({ size = "md", showLabels = true, className = "" }) {
  const imgClass =
    size === "lg"
      ? "h-20 w-auto md:h-28"
      : size === "sm"
        ? "h-14 w-auto md:h-16"
        : "h-16 w-auto md:h-20";

  return (
    <div
      className={`flex flex-wrap items-end justify-center gap-3 md:gap-5 ${className}`}
      aria-hidden={!showLabels}
    >
      {WRITING_BUDDIES.map((pet, index) => (
        <motion.figure
          key={pet.id}
          className="pet-sticker group"
          style={{ rotate: `${pet.tilt}deg` }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.08, duration: 0.35 }}
        >
          <motion.img
            alt=""
            src={pet.src}
            className={imgClass}
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3.2 + index * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {showLabels && (
            <figcaption className="pet-sticker-label">{pet.label}</figcaption>
          )}
        </motion.figure>
      ))}
    </div>
  );
}
