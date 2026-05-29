import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

interface RunawayNoButtonProps {
  label?: string;
  onCaught?: () => void;
}

const BTN_W = 130;
const BTN_H = 44;

export function RunawayNoButton({
  label = "nah",
  onCaught,
}: RunawayNoButtonProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const fleeCount = useRef(0);

  const flee = useCallback(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    const { width, height } = zone.getBoundingClientRect();
    const maxX = Math.max(0, width - BTN_W);
    const maxY = Math.max(0, height - BTN_H);

    setPos({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
    fleeCount.current += 1;
  }, []);

  useEffect(() => {
    flee();
  }, [flee]);

  const handlePointerNear = (clientX: number, clientY: number) => {
    const zone = zoneRef.current;
    if (!zone) return;

    const rect = zone.getBoundingClientRect();
    const btnCenterX = rect.left + pos.x + BTN_W / 2;
    const btnCenterY = rect.top + pos.y + BTN_H / 2;
    const dist = Math.hypot(clientX - btnCenterX, clientY - btnCenterY);

    if (dist < 100) flee();
  };

  return (
    <div
      ref={zoneRef}
      className="relative mt-5 h-36 w-full max-w-sm touch-none select-none sm:h-40"
      onMouseMove={(e) => handlePointerNear(e.clientX, e.clientY)}
      onTouchMove={(e) => {
        const touch = e.touches[0];
        if (touch) handlePointerNear(touch.clientX, touch.clientY);
      }}
      aria-label="Decline button play area"
    >
      <motion.button
        type="button"
        className="absolute z-10 cursor-default rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-[var(--color-muted)] backdrop-blur-md"
        style={{ left: pos.x, top: pos.y, width: BTN_W }}
        animate={{ left: pos.x, top: pos.y }}
        transition={{ type: "spring", stiffness: 380, damping: 22 }}
        onMouseEnter={flee}
        onFocus={flee}
        onTouchStart={(e) => {
          e.preventDefault();
          flee();
        }}
        onPointerDown={(e) => {
          if (fleeCount.current < 12) {
            e.preventDefault();
            flee();
            return;
          }
          onCaught?.();
        }}
        onClick={(e) => {
          e.preventDefault();
          if (fleeCount.current >= 15) onCaught?.();
        }}
      >
        {label}
      </motion.button>
    </div>
  );
}
