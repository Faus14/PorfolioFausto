"use client";

import { useState } from "react";
import { FiAlertCircle, FiCheckCircle, FiSend } from "react-icons/fi";
import { isValidEmail } from "@/utils/check-email";
import { useTranslation } from "@/hooks/useTranslation";

const MAX_MSG = 1000;
const EMPTY = { name: "", email: "", message: "" };

const inputClass =
  "w-full rounded-lg border bg-canvas/60 px-3.5 py-2.5 text-sm text-white placeholder:text-ink-faint outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent-line focus:shadow-[0_0_0_3px_rgba(22,242,179,0.12)]";

function ContactForm() {
  const { t } = useTranslation();
  const [values, setValues] = useState(EMPTY);
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });

  const emailInvalid = emailTouched && values.email !== "" && !isValidEmail(values.email);
  const isLoading = status.type === "loading";

  const update = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus({ type: "error", message: t("formRequired") });
      return;
    }
    if (!isValidEmail(values.email)) {
      setEmailTouched(true);
      setStatus({ type: "error", message: t("formInvalidEmail") });
      return;
    }

    setStatus({ type: "loading", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setValues(EMPTY);
      setEmailTouched(false);
      setStatus({ type: "success", message: t("formSuccess") });
    } catch {
      setStatus({ type: "error", message: t("formError") });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-6 sm:p-8" aria-labelledby="contact-form-title">
      <h3 id="contact-form-title" className="text-lg font-semibold tracking-tight text-white">
        {t("formTitle")}
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-xs font-medium text-ink-muted">
            {t("formName")}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength={100}
            required
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            placeholder={t("formNamePlaceholder")}
            className={`${inputClass} border-line`}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-xs font-medium text-ink-muted">
            {t("formEmail")}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            maxLength={100}
            required
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            onBlur={() => setEmailTouched(true)}
            placeholder="name@example.com"
            aria-invalid={emailInvalid}
            aria-describedby={emailInvalid ? "email-error" : undefined}
            className={`${inputClass} ${emailInvalid ? "border-red-400/70" : "border-line"}`}
          />
          {emailInvalid && (
            <p id="email-error" className="text-xs text-red-300">
              {t("formInvalidEmail")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <div className="flex items-baseline justify-between">
            <label htmlFor="message" className="text-xs font-medium text-ink-muted">
              {t("formMessage")}
            </label>
            <span className="font-mono text-[11px] text-ink-faint">
              {values.message.length}/{MAX_MSG}
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={MAX_MSG}
            required
            value={values.message}
            onChange={update("message")}
            placeholder={t("formMessagePlaceholder")}
            className={`${inputClass} resize-y border-line`}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p
          role="status"
          aria-live="polite"
          className={`flex items-start gap-2 text-sm ${
            status.type === "success" ? "text-accent" : status.type === "error" ? "text-red-300" : "text-transparent"
          }`}
        >
          {status.type === "success" && <FiCheckCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
          {status.type === "error" && <FiAlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />}
          {status.message}
        </p>
        <button type="submit" disabled={isLoading} className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? t("formSending") : t("formSend")}
          <FiSend className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default ContactForm;
