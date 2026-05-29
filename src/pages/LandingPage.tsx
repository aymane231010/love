import { motion } from "framer-motion";
import { AnimatedButton } from "../components/AnimatedButton";
import { GlassCard } from "../components/GlassCard";

interface LandingPageProps {
  onEnter: () => void;
}

export function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <GlassCard className="text-center">
      <motion.p
        className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl"
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        warning: this website may accidentally convince you to go on a date
        with me
      </motion.p>

      <motion.p
        className="mt-4 text-sm text-[var(--color-muted)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        side effects may include smiling and saying yes
      </motion.p>

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
      >
        <AnimatedButton onClick={onEnter}>continue at your own risk</AnimatedButton>
      </motion.div>
    </GlassCard>
  );
}
