import { motion } from "framer-motion";

const hearts = Array.from({ length: 12 }, (_, i) => i);

export function CompletionBurst() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {hearts.map((i) => (
        <motion.span
          key={i}
          className="absolute left-1/2 top-1/2 text-xl"
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0.8],
            x: (Math.cos((i / 12) * Math.PI * 2) * 120),
            y: (Math.sin((i / 12) * Math.PI * 2) * 120),
          }}
          transition={{ duration: 1.2, delay: i * 0.04, ease: "easeOut" }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  );
}
