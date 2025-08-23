import { Phone, Mail, Linkedin } from "lucide-react";
import { useState, FormEvent, useEffect } from "react";
import { toast } from "sonner";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const id = import.meta.env.VITE_FORMSPREE_ID;
  console.log(id);

  const [state, handleSubmit] = useForm(id || "");

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully! I'll get back to you soon.");
    }
    if (state.errors) {
      toast.error("Something went wrong. Please try again.");
    }
  }, [state.succeeded, state.errors]);

  return (
    <section
      id="contact"
      className="section-padding bg-portfolioTheme-secondary"
    >
      <div className="container mx-auto px-4">
        <h2 className="section-title">
          Let's Build Something Amazing Together
        </h2>
        <p className="text-portfolioTheme-textAccent mt-4 mb-12 max-w-2xl">
          Have a project in mind or want to discuss a potential collaboration?
          Reach out to me through any of the channels below.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <div className="space-y-6">
              {/* WhatsApp */}
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

              {/* Email */}
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

              {/* LinkedIn */}
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

          {/* Contact form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <form
              onSubmit={handleSubmit}
              className="bg-portfolioTheme-cardBg p-6 rounded-lg shadow-lg"
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary"
                  placeholder="Your email"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full primary-btn flex justify-center items-center"
              >
                {state.submitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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
};

export default Contact;
