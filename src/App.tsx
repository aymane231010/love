import { useState } from "react";
import { MusicToggle } from "./components/MusicToggle";
import { PageTransition } from "./components/PageTransition";
import { ParticleBackground } from "./components/ParticleBackground";
import { useSessionId } from "./hooks/useSessionId";
import { AnalysisPage } from "./pages/AnalysisPage";
import { FinalPage } from "./pages/FinalPage";
import { IntroPage } from "./pages/IntroPage";
import { LandingPage } from "./pages/LandingPage";
import { QuestionsPage } from "./pages/QuestionsPage";
import type { AppStep } from "./types";

export default function App() {
  const sessionId = useSessionId();
  const [step, setStep] = useState<AppStep>("landing");

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-[#050505]">
      <ParticleBackground />
      <MusicToggle />

      <main className="relative z-10">
        <PageTransition stepKey={step}>
          {step === "landing" && (
            <LandingPage onEnter={() => setStep("intro")} />
          )}
          {step === "intro" && (
            <IntroPage onStart={() => setStep("questions")} />
          )}
          {step === "questions" && (
            <QuestionsPage
              sessionId={sessionId}
              onComplete={() => setStep("analysis")}
            />
          )}
          {step === "analysis" && (
            <AnalysisPage onComplete={() => setStep("final")} />
          )}
          {step === "final" && <FinalPage sessionId={sessionId} />}
        </PageTransition>
      </main>
    </div>
  );
}
