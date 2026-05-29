import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  rotate: number;
}

const COLORS = ["#ff8ec7", "#c9a0ff", "#ffffff", "#ffb8e0", "#e0c3ff"];

export function ConfettiCelebration() {
  const pieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.4,
      duration: Math.random() * 2 + 2.5,
      color: COLORS[i % COLORS.length],
      size: Math.random() * 8 + 4,
      rotate: Math.random() * 360,
    }));
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-sm"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size * 0.6,
            backgroundColor: p.color,
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: "110vh",
            opacity: [1, 1, 0],
            rotate: p.rotate + 720,
            x: [0, (Math.random() - 0.5) * 120],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}
