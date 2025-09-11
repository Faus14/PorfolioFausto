"use client";
// @flow strict
import { isValidEmail } from "@/utils/check-email";
import { useTranslation } from "@/hooks/useTranslation";
import axios from "axios";
import { useMemo, useState } from "react";
import { TbMailForward } from "react-icons/tb";
import { toast } from "react-toastify";

const MAX_MSG = 500;

function ContactForm() {
  const { t, language } = useTranslation();

  const [error, setError] = useState({ email: false, required: false });
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Endpoint robusto: usa env si existe, sino ruta relativa
  const endpoint = useMemo(() => {
    const base = process.env.NEXT_PUBLIC_APP_URL;
    if (base && typeof base === "string") {
      // quita trailing slash si lo hubiera
      const norm = base.replace(/\/$/, "");
      return `${norm}/api/contact`;
    }
    return "/api/contact";
  }, []);

  const checkRequired = () => {
    if (userInput.email && userInput.message && userInput.name) {
      setError((prev) => ({ ...prev, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();

    const emailInvalid = !isValidEmail(userInput.email);
    const missing = !userInput.email || !userInput.message || !userInput.name;

    if (missing) {
      setError((prev) => ({ ...prev, required: true }));
      return;
    }
    if (emailInvalid) {
      setError((prev) => ({ ...prev, email: true }));
      return;
    }

    setError({ email: false, required: false });

    try {
      setIsLoading(true);

      await axios.post(endpoint, userInput, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      });

      toast.success(
        language === "es"
          ? "¡Mensaje enviado exitosamente!"
          : "Message sent successfully!"
      );

      setUserInput({ name: "", email: "", message: "" });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (language === "es"
          ? "No se pudo enviar el mensaje. Intenta de nuevo."
          : "Could not send your message. Please try again.");
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        {language === "es" ? "Contáctame" : "Contact with me"}
      </p>

      <form
        onSubmit={handleSendMail}
        className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 sm:p-4 lg:p-5 bg-[#0d1224]/40 backdrop-blur-[2px]"
        noValidate
      >
        <p className="text-sm text-[#d3d8e8]">
          {language === "es"
            ? "Si tenés alguna pregunta, escribime. Abierto a oportunidades alineadas a mis skills."
            : "If you have any questions, reach out. I’m open to opportunities aligned with my skills."}
        </p>

        <div className="mt-6 flex flex-col gap-4">
          {/* Nombre */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base">
              {language === "es" ? "Tu Nombre:" : "Your Name:"}
            </label>
            <input
              id="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength={100}
              required
              onChange={(e) =>
                setUserInput({ ...userInput, name: e.target.value })
              }
              onBlur={checkRequired}
              value={userInput.name}
              placeholder={language === "es" ? "Tu nombre" : "Your name"}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base">
              {language === "es" ? "Tu Email:" : "Your Email:"}
            </label>
            <input
              id="email"
              className={`bg-[#10172d] w-full border rounded-md ring-0 outline-0 transition-all duration-300 px-3 py-2 ${
                error.email ? "border-red-400" : "border-[#353a52] focus:border-[#16f2b3]"
              }`}
              type="email"
              inputMode="email"
              maxLength={100}
              required
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
              onBlur={() => {
                checkRequired();
                setError((prev) => ({
                  ...prev,
                  email: !isValidEmail(userInput.email),
                }));
              }}
              placeholder="name@example.com"
              autoComplete="email"
              aria-invalid={error.email ? "true" : "false"}
            />
            {error.email && (
              <p className="text-sm text-red-400">
                {language === "es"
                  ? "¡Por favor proporciona un email válido!"
                  : "Please provide a valid email!"}
              </p>
            )}
          </div>

          {/* Mensaje */}
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-base">
              {language === "es" ? "Tu Mensaje:" : "Your Message:"}
            </label>
            <textarea
              id="message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength={MAX_MSG}
              name="message"
              required
              onChange={(e) =>
                setUserInput({ ...userInput, message: e.target.value })
              }
              onBlur={checkRequired}
              rows={4}
              value={userInput.message}
              placeholder={
                language === "es"
                  ? "Contame brevemente sobre tu proyecto…"
                  : "Tell me briefly about your project…"
              }
            />
            <div className="text-xs text-white/60 self-end">
              {userInput.message.length}/{MAX_MSG}
            </div>
          </div>

          {/* Errores requeridos */}
          {error.required && (
            <p className="text-sm text-red-400">
              {language === "es"
                ? "¡Todos los campos son requeridos!"
                : "All fields are required!"}
            </p>
          )}

          {/* Botón */}
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-semibold uppercase tracking-wider text-white transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  {language === "es"
                    ? "Enviando Mensaje..."
                    : "Sending Message..."}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  {language === "es" ? "Enviar Mensaje" : "Send Message"}
                  <TbMailForward size={20} />
                </span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContactForm;
