import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlassCard } from "../components/GlassCard";
import { HER_NAME } from "../config/personalization";

interface AnalysisPageProps {
  onComplete: () => void;
}

const STEPS = [
  { text: "analyzing compatibility...", delay: 0 },
  { text: "results looking dangerous \uD83D\uDE2D", delay: 1800 },
  { text: "okay wait this might actually be a good date", delay: 3600 },
  { text: `${HER_NAME} + me = suspiciously good match`, delay: 5400 },
];

export function AnalysisPage({ onComplete }: AnalysisPageProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (stepIndex >= STEPS.length - 1) {
      const t = setTimeout(onComplete, 2200);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setStepIndex((i) => i + 1), 1800);
    return () => clearTimeout(t);
  }, [stepIndex, onComplete]);

  return (
    <GlassCard className="text-center">
      <motion.div
        className="mx-auto mb-8 h-14 w-14 rounded-full border-2 border-white/10 border-t-[#ff8ec7]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      />

      <div className="min-h-[4rem]">
        <AnimatePresence mode="wait">
          <motion.p
            key={STEPS[stepIndex].text}
            className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl"
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.45 }}
          >
            {STEPS[stepIndex].text}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.div
        className="mt-8 flex justify-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {STEPS.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stepIndex
                ? "w-6 bg-gradient-to-r from-[#ff8ec7] to-[#c9a0ff]"
                : "w-1.5 bg-white/15"
            }`}
          />
        ))}
      </motion.div>
    </GlassCard>
  );
}
