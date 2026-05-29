export type AppStep = "landing" | "intro" | "questions" | "analysis" | "final";

export type QuestionType = "choice" | "text";

export interface Question {
  key: string;
  label: string;
  emoji: string;
  subtitle?: string;
  type: QuestionType;
  options?: string[];
}

export interface SavedAnswers {
  [questionKey: string]: string;
}