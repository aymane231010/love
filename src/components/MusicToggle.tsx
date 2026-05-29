import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.25;
    audioRef.current = audio;

    audio.addEventListener("canplaythrough", () => setReady(true));
    audio.addEventListener("error", () => setReady(false));

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !ready) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={toggle}
      disabled={!ready}
      className="fixed right-4 top-4 z-50 flex h-11 w-11 items-center justify-center rounded-full glass-card text-lg disabled:opacity-40"
      whileHover={{ scale: ready ? 1.08 : 1 }}
      whileTap={{ scale: ready ? 0.95 : 1 }}
      aria-label={playing ? "Pause music" : "Play music"}
      title={ready ? (playing ? "pause music" : "play music") : "add music.mp3 to /public"}
    >
      {playing ? "🔊" : "🎵"}
    </motion.button>
  );
}
