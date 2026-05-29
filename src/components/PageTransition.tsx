import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  stepKey: string;
  children: ReactNode;
}

const variants = {
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(6px)" },
};

export function PageTransition({ stepKey, children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-5 py-16"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
