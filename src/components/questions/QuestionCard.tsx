import { AnimatePresence, motion } from "framer-motion";
import type { Question } from "../../types";
import { AnimatedButton } from "../AnimatedButton";

interface QuestionCardProps {
  question: Question;
  value: string;
  saving: boolean;
  isFirst: boolean;
  isLast: boolean;
  onChange: (value: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}

export function QuestionCard({
  question,
  value,
  saving,
  isFirst,
  isLast,
  onChange,
  onPrevious,
  onNext,
}: QuestionCardProps) {
  const canContinue = value.trim().length > 0;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.key}
        initial={{ opacity: 0, x: 40, rotate: 1 }}
        animate={{ opacity: 1, x: 0, rotate: 0 }}
        exit={{ opacity: 0, x: -40, rotate: -1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div className="mb-2 text-3xl">{question.emoji}</div>
        <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight font-semibold text-gradient sm:text-4xl">
          {question.label}
        </h2>
        {question.subtitle && (
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            {question.subtitle}
          </p>
        )}

        <div className="mt-8">
          {question.type === "choice" && question.options ? (
            <div
              className={
                question.options.length > 2
                  ? "grid grid-cols-1 gap-3"
                  : "flex flex-col gap-3 sm:flex-row"
              }
            >
              {question.options.map((option) => (
                <motion.button
                  key={option}
                  type="button"
                  disabled={saving}
                  onClick={() => onChange(option)}
                  className={`option-chip glass-card rounded-2xl px-4 py-3.5 text-left text-sm font-medium ${
                    value === option ? "selected" : ""
                  }`}
                  whileTap={{ scale: 0.97 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          ) : (
            <input
              className="text-input"
              type="text"
              placeholder="be honest..."
              value={value}
              disabled={saving}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canContinue && !saving) onNext();
              }}
              maxLength={200}
            />
          )}
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <AnimatedButton
            variant="ghost"
            className="!max-w-[7.5rem] shrink-0 opacity-90"
            onClick={onPrevious}
            disabled={isFirst || saving}
          >
            back
          </AnimatedButton>
          <AnimatedButton
            className="flex-1 !max-w-none"
            onClick={onNext}
            disabled={!canContinue}
            loading={saving}
          >
            {isLast ? "run analysis" : "next"}
          </AnimatedButton>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
