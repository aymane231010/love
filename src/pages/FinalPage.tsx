import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ConfettiCelebration } from "../components/ConfettiCelebration";
import { GlassCard } from "../components/GlassCard";
import { PlayfulYesButtons } from "../components/PlayfulYesButtons";
import { HER_NAME } from "../config/personalization";
import { openWhatsApp } from "../lib/whatsapp";
import { saveAnswer } from "../lib/supabase";

type Phase = "buildup" | "reveal" | "question" | "celebration";

interface FinalPageProps {
  sessionId: string;
}

const buildupLines = [
  "after extensive research...",
  "careful analysis...",
  "and multiple risky calculations...",
];

export function FinalPage({ sessionId }: FinalPageProps) {
  const [phase, setPhase] = useState<Phase>("buildup");
  const [lineIndex, setLineIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (phase !== "buildup") return;
    if (lineIndex >= buildupLines.length - 1) {
      const t = setTimeout(() => setPhase("reveal"), 1400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLineIndex((i) => i + 1), 1200);
    return () => clearTimeout(t);
  }, [phase, lineIndex]);

  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => setPhase("question"), 2200);
    return () => clearTimeout(t);
  }, [phase]);

  const handleOpenWhatsApp = () => {
    openWhatsApp();
  };

  const handleYes = async () => {
    setSaving(true);
    await saveAnswer(sessionId, "date_decision", "yes");
    setSaving(false);
    setPhase("celebration");
    setTimeout(handleOpenWhatsApp, 1800);
  };

  return (
    <>
      {phase === "celebration" && <ConfettiCelebration />}
      <GlassCard className="relative overflow-visible text-center">
        <AnimatePresence mode="wait">
          {phase === "buildup" && (
            <motion.div key="buildup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={buildupLines[lineIndex]}
                  className="font-[family-name:var(--font-display)] text-2xl leading-snug sm:text-3xl"
                  initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                >
                  {buildupLines[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>
          )}
          {phase === "reveal" && (
            <motion.div key="reveal" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ type: "spring", stiffness: 200, damping: 18 }}>
              <p className="mb-3 text-4xl">{"\uD83D\uDC95"}</p>
              <p className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl text-gradient">i think we should go on a date</p>
            </motion.div>
          )}
          {phase === "question" && (
            <motion.div key="question" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <p className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl">so... when are we making this happen?</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{HER_NAME}, choose wisely. (spoiler: they all lead to yes)</p>
              <PlayfulYesButtons onYes={handleYes} loading={saving} />
            </motion.div>
          )}
          {phase === "celebration" && (
            <motion.div key="celebration" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="mb-2 text-4xl">{"\u2728"}</p>
              <p className="font-[family-name:var(--font-display)] text-3xl leading-snug sm:text-4xl">perfect {"\uD83D\uDE0C"}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">now text me before i change my mind</p>
              <motion.p className="mt-6 text-xs text-[var(--color-blush)]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>opening WhatsApp...</motion.p>
              <motion.button type="button" className="mt-6 text-sm text-[var(--color-muted)] underline underline-offset-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} onClick={handleOpenWhatsApp}>
                tap here to open WhatsApp
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </>
  );
}