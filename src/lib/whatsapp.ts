import {
  DEFAULT_WHATSAPP_URL,
  WHATSAPP_MESSAGE,
} from "../config/personalization";

export function getWhatsAppConfig(): string {
  const fromEnv = import.meta.env.VITE_WHATSAPP_URL?.trim();
  return fromEnv || DEFAULT_WHATSAPP_URL;
}

export function normalizePhoneNumber(input: string): string {
  return input.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  envValue?: string,
  message: string = WHATSAPP_MESSAGE,
): string | null {
  const raw = (envValue ?? getWhatsAppConfig()).trim();
  if (!raw) return null;

  const text = encodeURIComponent(message);

  if (/^https?:\/\/(www\.)?wa\.me\//i.test(raw)) {
    if (raw.includes("/qr/")) {
      return null;
    }
    const base = raw.split("?")[0];
    return `${base}?text=${text}`;
  }

  if (raw.includes("api.whatsapp.com")) {
    const digits = raw.match(/phone=(\d+)/)?.[1];
    if (digits) return `https://wa.me/${digits}?text=${text}`;
  }

  const digits = normalizePhoneNumber(raw);
  if (digits.length >= 9) {
    return `https://wa.me/${digits}?text=${text}`;
  }

  return null;
}

export function openWhatsApp(envValue?: string): boolean {
  const url = buildWhatsAppUrl(envValue);
  if (!url) return false;

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return true;
}