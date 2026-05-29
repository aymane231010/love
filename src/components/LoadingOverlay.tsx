import { motion } from "framer-motion";

export function LoadingOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="h-12 w-12 rounded-full border-2 border-white/10 border-t-[#ff8ec7]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <p className="text-sm tracking-widest text-[var(--color-muted)] uppercase">
          one sec…
        </p>
      </div>
    </motion.div>
  );
}
