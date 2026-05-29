import { WHATSAPP_MESSAGE } from "../config/personalization";

/** Morocco +212682321680 → 212682321680 */
export function normalizePhoneNumber(input: string): string {
  return input.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  envValue: string | undefined,
  message: string = WHATSAPP_MESSAGE,
): string | null {
  const raw = envValue?.trim();
  if (!raw) return null;

  const text = encodeURIComponent(message);

  // Full wa.me link already provided
  if (/^https?:\/\/(www\.)?wa\.me\//i.test(raw)) {
    // QR links don't support ?text= reliably — use phone if set separately
    if (raw.includes("/qr/")) {
      return null;
    }
    const base = raw.split("?")[0];
    return `${base}?text=${text}`;
  }

  // api.whatsapp.com/send?phone=...
  if (raw.includes("api.whatsapp.com")) {
    const digits = raw.match(/phone=(\d+)/)?.[1];
    if (digits) return `https://wa.me/${digits}?text=${text}`;
  }

  // Digits only or +212...
  const digits = normalizePhoneNumber(raw);
  if (digits.length >= 9) {
    return `https://wa.me/${digits}?text=${text}`;
  }

  return null;
}

export function openWhatsApp(envValue: string | undefined): boolean {
  const url = buildWhatsAppUrl(envValue);
  if (!url) return false;

  // location.href works better on mobile than window.open
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return true;
}
