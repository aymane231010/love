import { motion } from "framer-motion";
import { useState } from "react";
import { AnimatedButton } from "../components/AnimatedButton";
import { GlassCard } from "../components/GlassCard";
import { HER_NAME } from "../config/personalization";

interface IntroPageProps {
  onStart: () => void;
}

const lines = [
  { text: "before anything...", delay: 0.15 },
  { text: `${HER_NAME}, you seem suspiciously cool`, delay: 0.55 },
  { text: "so i had to investigate", delay: 0.95 },
  {
    text: "this is a completely serious scientific process btw",
    delay: 1.35,
  },
];

export function IntroPage({ onStart }: IntroPageProps) {
  const [showButton, setShowButton] = useState(false);

  return (
    <GlassCard className="text-center">
      <div className="space-y-5">
        {lines.map((line) => (
          <motion.p
            key={line.text}
            className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              delay: line.delay,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => {
              if (line.delay === 1.35) setShowButton(true);
            }}
          >
            {line.text}
          </motion.p>
        ))}
      </div>

      {showButton && (
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <AnimatedButton onClick={onStart}>start investigation</AnimatedButton>
        </motion.div>
      )}
    </GlassCard>
  );
}
