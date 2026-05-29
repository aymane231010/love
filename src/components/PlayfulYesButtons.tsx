import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { AnimatedButton } from "./AnimatedButton";

interface PlayfulYesButtonsProps {
  onYes: () => void;
  loading?: boolean;
}

export function PlayfulYesButtons({ onYes, loading }: PlayfulYesButtonsProps) {
  const zoneRef = useRef<HTMLDivElement>(null);
  const [btn2Pos, setBtn2Pos] = useState({ x: 0, y: 0 });
  const [btn2Converted, setBtn2Converted] = useState(false);
  const [btn3State, setBtn3State] = useState<"idle" | "thinking" | "converted">(
    "idle",
  );
  const fleeCount = useRef(0);

  const fleeBtn2 = useCallback(() => {
    const zone = zoneRef.current;
    if (!zone) return;

    fleeCount.current += 1;
    if (fleeCount.current >= 3) {
      setBtn2Converted(true);
      return;
    }

    const { width, height } = zone.getBoundingClientRect();
    setBtn2Pos({
      x: Math.random() * Math.max(0, width - 220),
      y: Math.random() * Math.max(0, height - 48),
    });
  }, []);

  const handleThink = () => {
    if (btn3State !== "idle") return;
    setBtn3State("thinking");
    setTimeout(() => setBtn3State("converted"), 1600);
  };

  return (
    <div ref={zoneRef} className="relative mt-8 min-h-[220px] w-full">
      <div className="flex flex-col items-center gap-3">
        <AnimatedButton onClick={onYes} loading={loading}>
          yes obviously {"\uD83D\uDE0C"}
        </AnimatedButton>

        <AnimatePresence mode="wait">
          {btn2Converted ? (
            <motion.div
              key="b2-yes"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xs"
            >
              <AnimatedButton onClick={onYes} loading={loading}>
                fine, yes obviously {"\uD83D\uDE0C"}
              </AnimatedButton>
            </motion.div>
          ) : (
            <motion.button
              key="b2-flee"
              type="button"
              className="glass-card absolute z-10 rounded-full px-6 py-3 text-sm font-medium"
              style={{ left: btn2Pos.x, top: btn2Pos.y + 56 }}
              animate={{ left: btn2Pos.x, top: btn2Pos.y + 56 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              onMouseEnter={fleeBtn2}
              onFocus={fleeBtn2}
              onTouchStart={(e) => {
                e.preventDefault();
                fleeBtn2();
              }}
              onClick={(e) => {
                e.preventDefault();
                fleeBtn2();
              }}
            >
              I guess you&apos;re cool too
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {btn3State === "idle" && (
            <motion.button
              key="think"
              type="button"
              className="glass-card mt-14 w-full max-w-xs rounded-full px-6 py-3 text-sm font-medium text-[var(--color-muted)]"
              onClick={handleThink}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              let me think
            </motion.button>
          )}
          {btn3State === "thinking" && (
            <motion.div
              key="thinking"
              className="mt-14 flex items-center gap-2 text-sm text-[var(--color-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/10 border-t-[#ff8ec7]" />
              hmm... calculating...
            </motion.div>
          )}
          {btn3State === "converted" && (
            <motion.div
              key="b3-yes"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 w-full max-w-xs"
            >
              <AnimatedButton onClick={onYes} loading={loading}>
                okay yes {"\uD83D\uDE05"}
              </AnimatedButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
