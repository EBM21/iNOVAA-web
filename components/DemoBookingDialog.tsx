"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, CalendarClock, Loader2, X } from "lucide-react";

// ▼ Paste your Google Apps Script web app URL here (ends in /exec).
//   Setup steps for the sheet + script: scripts/google-sheet-bookings.gs
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzXYPSBWj84dCLXHuxVSWC2ojUamSkU2r0uQxlYXfOy3tqu7_5YTlXiUycgy9XcQEPZ-Q/exec";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string };

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border-strong bg-white px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-2 focus:border-brand-orange focus:shadow-[0_0_0_4px_rgba(249,115,22,0.12)]";

/** Popup that collects name, number, and email for the picked slot and saves it as a row in the Google Sheet. */
export default function DemoBookingDialog({
  open,
  onClose,
  onBooked,
  date,
  dateLabel,
  slot,
}: {
  open: boolean;
  onClose: () => void;
  onBooked: () => void;
  date: string; // YYYY-MM-DD
  dateLabel: string;
  slot: string;
}) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const firstInput = useRef<HTMLInputElement>(null);
  const closeRef = useRef<() => void>(() => {});

  // Focus the first field on open; Escape closes (unless a request is in flight).
  useEffect(() => {
    if (!open) return;
    firstInput.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeRef.current();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    // Honeypot: a hidden field people never fill. Bots get a fake success and nothing is saved.
    if (form.get("company")) {
      onBooked();
      return;
    }

    setStatus({ kind: "sending" });
    try {
      // Sent as text/plain on purpose: a JSON content type makes the browser send a CORS preflight
      // that Apps Script can't answer. The script still receives and parses the JSON body.
      const res = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          date,
          slot,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("We couldn't save your booking. Please try again or email us.");
      setStatus({ kind: "idle" });
      onBooked();
    } catch (err) {
      // A network failure (bad URL, offline) throws a TypeError with a technical message — show ours instead.
      setStatus({
        kind: "error",
        message: err instanceof TypeError ? "We couldn't save your booking. Please try again or email us." : (err as Error).message,
      });
    }
  }

  const sending = status.kind === "sending";

  // Closing clears any error so the popup reopens clean.
  const close = () => {
    if (sending) return;
    setStatus({ kind: "idle" });
    onClose();
  };
  useEffect(() => {
    closeRef.current = close;
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-[#151210]/55 backdrop-blur-sm" onClick={close} aria-hidden />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-[0_40px_90px_-30px_rgba(21,18,16,0.5)]"
          >
            <span
              className="absolute inset-x-0 top-0 h-1"
              style={{ backgroundImage: "linear-gradient(90deg, var(--brand-purple), var(--brand-magenta), var(--brand-orange))" }}
            />
            <button
              type="button"
              onClick={close}
              disabled={sending}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted-2 transition-colors hover:bg-surface-2 hover:text-foreground disabled:opacity-40"
            >
              <X className="h-4 w-4" />
            </button>

            <form onSubmit={submit} className="p-6 sm:p-7">
              <h3 id="booking-title" className="text-xl font-bold tracking-tight text-foreground">
                Almost booked
              </h3>
              <p className="mt-2 flex items-center gap-2 rounded-xl bg-surface-2 px-3 py-2.5 text-sm text-foreground">
                <CalendarClock className="h-4 w-4 shrink-0 text-brand-orange" />
                <span>
                  <strong>{dateLabel}</strong> · {slot}
                </span>
              </p>

              <div className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-foreground">
                  Name
                  <input ref={firstInput} name="name" required maxLength={100} autoComplete="name" placeholder="Your full name" className={inputClass} />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Contact number
                  <input
                    name="phone"
                    type="tel"
                    required
                    inputMode="tel"
                    pattern="\+?[\d\s\-\(\)\.]{7,20}"
                    title="7–20 digits; may start with +"
                    autoComplete="tel"
                    placeholder="+92 300 1234567"
                    className={inputClass}
                  />
                </label>
                <label className="block text-sm font-medium text-foreground">
                  Email
                  <input name="email" type="email" required maxLength={200} autoComplete="email" placeholder="you@company.com" className={inputClass} />
                </label>
                {/* honeypot — hidden from people, tempting to bots */}
                <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
              </div>

              {status.kind === "error" && (
                <p role="alert" className="mt-4 rounded-xl bg-status-red/10 px-3 py-2.5 text-sm text-status-red">
                  {status.message}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="btn-primary mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold disabled:cursor-wait disabled:opacity-80"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Confirm booking <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-muted-2">We&apos;ll confirm by email within one business day.</p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
