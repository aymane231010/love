import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  variant?: "primary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function AnimatedButton({
  children,
  variant = "primary",
  loading = false,
  disabled,
  className = "",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  const base =
    "relative z-20 w-full max-w-xs overflow-hidden rounded-full px-8 py-3.5 text-sm font-medium tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50";

  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-[#ff8ec7] to-[#c9a0ff] text-[#0a0a0a] shadow-[0_8px_32px_rgba(255,142,199,0.35)]"
      : "glass-card text-[var(--color-ink)]";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${base} ${styles} ${className}`}
      whileHover={disabled || loading ? undefined : { scale: 1.04, y: -2 }}
      whileTap={disabled || loading ? undefined : { scale: 0.97 }}
      disabled={disabled || loading}
    >
      <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
        {loading ? (
          <>
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-black/20 border-t-black/70" />
            saving...
          </>
        ) : (
          children
        )}
      </span>
      {variant === "primary" && !disabled && !loading && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <motion.span
            className="absolute inset-0 bg-white/20"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </span>
      )}
    </motion.button>
  );
}