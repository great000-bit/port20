// src/components/Contact.tsx
import React, { useEffect, useState, useRef } from "react";
import { Phone, Mail, Linkedin, CheckCircle } from "lucide-react";
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
                I’ll get back to you soon — expect a response within{" "}
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
          {/* Left: contact info (unchanged but kept polished) */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-portfolioTheme-cardBg rounded-full flex items-center justify-center text-portfolioTheme-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-small">WhatsApp</h4>
                  <a
                    href="https://wa.me/2347037845433"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors"
                  >
                    +234 703 784 5433
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-portfolioTheme-cardBg rounded-full flex items-center justify-center text-portfolioTheme-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:greatemmanwori@gmail.com"
                    className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors"
                  >
                    greatemmanwori@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-portfolioTheme-cardBg rounded-full flex items-center justify-center text-portfolioTheme-primary">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-medium">LinkedIn</h4>
                  <a
                    href="https://www.linkedin.com/in/great-emman-wori"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-portfolioTheme-textAccent hover:text-portfolioTheme-primary transition-colors"
                  >
                    www.linkedin.com/in/great-emman-wori
                  </a>
                </div>
              </div>
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
