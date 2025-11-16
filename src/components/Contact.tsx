// src/components/Contact.tsx
import React, { useEffect, useState, useRef } from "react";
import { Phone, Mail, Linkedin, CheckCircle, Instagram } from "lucide-react";
import { useForm } from "@formspree/react";
import { Helmet } from "react-helmet";
import * as Dialog from "@radix-ui/react-dialog";

const PURPOSE_OPTIONS = [
  "UI/UX Design",
  "Website Development",
  "WordPress",
  "Full-stack Development",
  "Volunteer Role",
  "Collaboration",
];

// TikTok icon as SVG component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

export default function Contact() {
  const formspreeId = String(import.meta.env.VITE_FORMSPREE_ID || "");
  const [state, handleSubmit] = useForm(formspreeId);

  // selected purpose shown in button and sent as hidden input
  const [purpose, setPurpose] = useState<string>("");

  // success UI state and graceful fade/scale-out
  const [showSuccess, setShowSuccess] = useState(false);
  const [closingSuccess, setClosingSuccess] = useState(false);
  const successTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  // show success overlay when formspree succeeded
  useEffect(() => {
    if (state.succeeded) {
      // show overlay
      setShowSuccess(true);
      setClosingSuccess(false);

      // start fade/scale-out near the end, then hide
      // fade start at 2.9s, hide at 3s
      // use window.setTimeout to get numeric timer id for cleanup
      successTimerRef.current = window.setTimeout(() => {
        setClosingSuccess(true);
      }, 2500);

      closeTimerRef.current = window.setTimeout(() => {
        setShowSuccess(false);
        setClosingSuccess(false);
      }, 3000);
    }

    // cleanup if component unmounts or state changes
    return () => {
      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
        successTimerRef.current = null;
      }
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [state.succeeded]);

  // optional: show inline errors if Formspree returned them
  const firstError =
    Array.isArray(state.errors) && state.errors.length > 0 ? state.errors[0] : null;

  return (
    <section id="contact" className="section-padding bg-portfolioTheme-secondary relative">
      <Helmet>
        <title>Contact Great Emman-wori | Let's Build Something Extraordinary</title>
        <meta
          name="description"
          content="Ready to transform your vision into a digital reality? Get in touch with Great Emman-wori for WordPress development, UI/UX design, and product design services. Let's collaborate on your next project."
        />
      </Helmet>

      {/* Center-screen success card */}
      {showSuccess && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          aria-hidden={false}
        >
          <div
            role="status"
            aria-live="polite"
            className={`pointer-events-auto max-w-lg w-[90%] bg-portfolioTheme-cardBg border border-portfolioTheme-primary shadow-2xl rounded-xl p-6 text-center transition-all duration-500 ${
              closingSuccess ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12 text-portfolioTheme-primary" />
              <h3 className="text-lg font-semibold text-white">Message Sent Successfully</h3>
              <p className="text-portfolioTheme-textAccent">
                I'll get back to you soon — expect a response within{" "}
                <span className="text-portfolioTheme-accent font-medium">20 minutes</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        <h2 className="section-title">LET'S BUILD SOMETHING EXTRAORDINARY</h2>
        <p className="text-portfolioTheme-textAccent mt-4 mb-12 max-w-2xl">
          Ready to transform your vision into a digital reality? Whether you have a specific project in mind
          or wish to explore a potential collaboration, I invite you to connect with me through any of the
          channels listed below.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: contact info - enhanced dynamic UI */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="space-y-4">
              {/* WhatsApp */}
              <a
                href="https://wa.me/2347037845433"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">WhatsApp</h4>
                  <p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">
                    +234 703 784 5433
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-portfolioTheme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:greatemmanwori@gmail.com"
                className="group relative flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Email</h4>
                  <p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors break-all">
                    greatemmanwori@gmail.com
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-portfolioTheme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/great-emman-wori"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">LinkedIn</h4>
                  <p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors break-all">
                    great-emman-wori
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-portfolioTheme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://msng.link/o?creative_emman=ig"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">Instagram</h4>
                  <p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">
                    @creative_emman
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-portfolioTheme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@great_emman_wori?_r=1&_t=ZS-91RhdZgg6um"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                  <TikTokIcon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white">TikTok</h4>
                  <p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">
                    @great_emman_wori
                  </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5 text-portfolioTheme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Right: contact form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <form onSubmit={handleSubmit} className="bg-portfolioTheme-cardBg p-6 rounded-lg shadow-lg space-y-4">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary"
                  placeholder="Enter your email"
                />
              </div>

              {/* Purpose selector (Radix dialog) */}
              <div>
                <label className="block text-sm font-medium mb-2">Purpose</label>

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button
                      type="button"
                      aria-haspopup="dialog"
                      className="w-full p-3 bg-portfolioTheme-secondary border border-gray-700 rounded-md text-left hover:border-portfolioTheme-primary"
                    >
                      {purpose || "Select purpose"}
                    </button>
                  </Dialog.Trigger>

                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                    <Dialog.Content
                      className="fixed top-1/2 left-1/2 z-50 w-96 max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-portfolioTheme-cardBg p-6 rounded-lg shadow-lg space-y-4"
                      aria-describedby="purpose-description"
                    >
                      <Dialog.Title className="text-lg font-bold text-white">Choose Purpose</Dialog.Title>
                      <p id="purpose-description" className="text-portfolioTheme-textAccent text-sm mb-2">
                        Tap an option to select it and continue writing your message.
                      </p>

                      <div className="grid grid-cols-1 gap-2">
                        {PURPOSE_OPTIONS.map((opt) => (
                          <Dialog.Close asChild key={opt}>
                            <button
                              type="button"
                              onClick={() => setPurpose(opt)}
                              className="w-full text-left px-3 py-2 rounded-md bg-portfolioTheme-secondary hover:bg-portfolioTheme-primary hover:text-white transition"
                            >
                              {opt}
                            </button>
                          </Dialog.Close>
                        ))}
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>

                <input type="hidden" name="purpose" value={purpose} />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary resize-none"
                  placeholder="Describe your project or idea..."
                />
              </div>

              {/* Inline error (if any) */}
              {firstError && (
                <div className="text-sm text-rose-400">
                  {firstError.message || "There was an error, please try again."}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={state.submitting}
                className="w-full inline-flex justify-center items-center gap-3 bg-portfolioTheme-accent hover:bg-amber-600 text-portfolioTheme-secondary px-4 py-3 rounded-md font-semibold transition"
              >
                {state.submitting ? (
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : null}
                {state.submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}