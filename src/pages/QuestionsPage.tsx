import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { CompletionBurst } from "../components/CompletionBurst";
import { GlassCard } from "../components/GlassCard";
import { ProgressBar } from "../components/ProgressBar";
import { QuestionCard } from "../components/questions/QuestionCard";
import { QUESTIONS } from "../data/questions";
import { saveAnswer } from "../lib/supabase";
import type { SavedAnswers } from "../types";

interface QuestionsPageProps {
  sessionId: string;
  onComplete: (answers: SavedAnswers) => void;
}

const ANSWERS_KEY = "love_date_answers";

function loadLocalAnswers(): SavedAnswers {
  try {
    const raw = localStorage.getItem(ANSWERS_KEY);
    return raw ? (JSON.parse(raw) as SavedAnswers) : {};
  } catch {
    return {};
  }
}

function persistLocalAnswers(answers: SavedAnswers) {
  localStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
}

export function QuestionsPage({ sessionId, onComplete }: QuestionsPageProps) {
  const [answers, setAnswers] = useState<SavedAnswers>(loadLocalAnswers);
  const [index, setIndex] = useState(() => {
    const saved = loadLocalAnswers();
    const firstUnanswered = QUESTIONS.findIndex((q) => !saved[q.key]);
    return firstUnanswered === -1 ? QUESTIONS.length - 1 : firstUnanswered;
  });
  const [saving, setSaving] = useState(false);
  const [justAnswered, setJustAnswered] = useState(false);

  const question = QUESTIONS[index];
  const isFirst = index === 0;
  const isLast = index === QUESTIONS.length - 1;
  const currentValue = answers[question.key] ?? "";

  const updateAnswer = useCallback(
    (value: string) => {
      setAnswers((prev) => {
        const next = { ...prev, [question.key]: value };
        persistLocalAnswers(next);
        return next;
      });
      setJustAnswered(true);
      setTimeout(() => setJustAnswered(false), 700);
    },
    [question.key],
  );

  const goPrevious = () => {
    if (index > 0) setIndex((i) => i - 1);
  };

  const goNext = async () => {
    const answer = (answers[question.key] ?? "").trim();
    if (!answer) return;

    setSaving(true);
    await saveAnswer(sessionId, question.key, answer);
    setSaving(false);

    if (isLast) {
      onComplete({ ...answers, [question.key]: answer });
      return;
    }

    setIndex((i) => i + 1);
  };

  return (
    <div className="relative w-full max-w-md">
      {justAnswered && <CompletionBurst />}
      <ProgressBar current={index + 1} total={QUESTIONS.length} />
      <GlassCard>
        <QuestionCard
          question={question}
          value={currentValue}
          saving={saving}
          isFirst={isFirst}
          isLast={isLast}
          onChange={updateAnswer}
          onPrevious={goPrevious}
          onNext={goNext}
        />
      </GlassCard>

      <AnimatePresence>
        {justAnswered && (
          <motion.p
            className="mt-4 text-center text-sm text-[var(--color-blush)]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            noted. very important data {"\uD83D\uDCDD"}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
