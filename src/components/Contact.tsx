import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Phone, Mail, Linkedin, CheckCircle, Instagram } from "lucide-react";
import { useForm } from "@formspree/react";
import { Helmet } from "react-helmet";
import * as Dialog from "@radix-ui/react-dialog";

// ===== DOTGRID BACKGROUND =====
function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

interface Dot { cx: number; cy: number; xOffset: number; yOffset: number; vx: number; vy: number; }

const DotGridBackground = ({
  dotSize = 3, gap = 25, baseColor = "#2a2a2a", activeColor = "#8F0075",
  proximity = 80, shockRadius = 150, shockStrength = 1.5,
}: { dotSize?: number; gap?: number; baseColor?: string; activeColor?: string;
  proximity?: number; shockRadius?: number; shockStrength?: number; }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const pointerRef = useRef({ x: -1000, y: -1000 });
  const containerRef = useRef<HTMLDivElement>(null);
  const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
  const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

  const buildGrid = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const { width, height } = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);
    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;
    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;
    const startX = (width - gridW) / 2 + dotSize / 2;
    const startY = (height - gridH) / 2 + dotSize / 2;
    const dots: Dot[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        dots.push({ cx: startX + x * cell, cy: startY + y * cell, xOffset: 0, yOffset: 0, vx: 0, vy: 0 });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;
    const springK = 0.08;
    const damping = 0.92;
    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: px, y: py } = pointerRef.current;
      const radius = dotSize / 2;
      for (const dot of dotsRef.current) {
        const ax = -springK * dot.xOffset;
        const ay = -springK * dot.yOffset;
        dot.vx = (dot.vx + ax) * damping;
        dot.vy = (dot.vy + ay) * damping;
        dot.xOffset += dot.vx;
        dot.yOffset += dot.vy;
        if (Math.abs(dot.xOffset) < 0.05 && Math.abs(dot.vx) < 0.05) { dot.xOffset = 0; dot.vx = 0; }
        if (Math.abs(dot.yOffset) < 0.05 && Math.abs(dot.vy) < 0.05) { dot.yOffset = 0; dot.vy = 0; }
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;
        let r = baseRgb.r, g = baseRgb.g, b = baseRgb.b;
        if (dsq <= proxSq) {
          const t = 1 - Math.sqrt(dsq) / proximity;
          r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
        }
        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseRgb, activeRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    const ro = new ResizeObserver(buildGrid);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [buildGrid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = e.clientX - rect.left;
      pointerRef.current.y = e.clientY - rect.top;
    };
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius) {
          const falloff = Math.max(0, 1 - dist / shockRadius);
          dot.vx += (dot.cx - cx) * shockStrength * falloff * 0.1;
          dot.vy += (dot.cy - cy) * shockStrength * falloff * 0.1;
        }
      }
    };
    const handleMouseLeave = () => { pointerRef.current.x = -1000; pointerRef.current.y = -1000; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("click", handleClick);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shockRadius, shockStrength]);

  return (
    <div ref={containerRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "auto" }} />
    </div>
  );
};

// ===== CONSTANTS =====
const PURPOSE_OPTIONS = ["UI/UX Design", "Website Development", "WordPress", "Full-stack Development", "Volunteer Role", "Collaboration"];

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// ===== CONTACT COMPONENT =====
export default function Contact() {
  const formspreeId = String(import.meta.env.VITE_FORMSPREE_ID || "");
  const [state, handleSubmit] = useForm(formspreeId);
  const [purpose, setPurpose] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [closingSuccess, setClosingSuccess] = useState(false);
  const successTimerRef = useRef<number | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      setClosingSuccess(false);
      successTimerRef.current = window.setTimeout(() => setClosingSuccess(true), 2500);
      closeTimerRef.current = window.setTimeout(() => { setShowSuccess(false); setClosingSuccess(false); }, 3000);
    }
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, [state.succeeded]);

  const firstError = Array.isArray(state.errors) && state.errors.length > 0 ? state.errors[0] : null;

  return (
    <section id="contact" className="section-padding bg-portfolioTheme-secondary" style={{ position: "relative", overflow: "hidden" }} itemScope itemType="https://schema.org/ContactPage">
      
      {/* DotGrid Background */}
      <DotGridBackground dotSize={3} gap={25} baseColor="#2a2a2a" activeColor="#8F0075" proximity={80} shockRadius={150} shockStrength={1.5} />

      <Helmet>
        <title>Contact Great Emman-Wori | WordPress Developer & UI/UX Designer in Nigeria</title>
        <meta name="description" content="Get in touch with Great Emman-Wori for WordPress development, UI/UX design, and product design services." />
      </Helmet>

      {/* Success overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none" role="alert">
          <div className={`pointer-events-auto max-w-lg w-[90%] bg-portfolioTheme-cardBg border border-portfolioTheme-primary shadow-2xl rounded-xl p-6 text-center transition-all duration-500 ${closingSuccess ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
            <div className="flex flex-col items-center gap-3">
              <CheckCircle className="w-12 h-12 text-portfolioTheme-primary" />
              <h3 className="text-lg font-semibold text-white">Message Sent Successfully</h3>
              <p className="text-portfolioTheme-textAccent">I'll get back to you soon — expect a response within <span className="text-portfolioTheme-accent font-medium">20 minutes</span>.</p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4" style={{ position: "relative", zIndex: 1 }}>
        <h2 className="section-title">LET'S BUILD SOMETHING EXTRAORDINARY</h2>
        <p className="text-portfolioTheme-textAccent mt-4 mb-12 max-w-2xl">Ready to transform your vision into a digital reality? Connect with me through any of the channels below.</p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: contact info */}
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              {/* WhatsApp */}
              <a href="https://wa.me/2349051380648" target="_blank" rel="noopener noreferrer nofollow" className="group flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Phone className="w-5 h-5" /></div>
                <div className="flex-1"><h4 className="font-medium text-white">WhatsApp</h4><p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">+234 905 138 0648</p></div>
              </a>
              {/* Email */}
              <a href="mailto:greatemmanwori@gmail.com" className="group flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Mail className="w-5 h-5" /></div>
                <div className="flex-1"><h4 className="font-medium text-white">Email</h4><p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors break-all">greatemmanwori@gmail.com</p></div>
              </a>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/great-emman-wori" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Linkedin className="w-5 h-5" /></div>
                <div className="flex-1"><h4 className="font-medium text-white">LinkedIn</h4><p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">great-emman-wori</p></div>
              </a>
              {/* Instagram */}
              <a href="https://msng.link/o?creative_emman=ig" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><Instagram className="w-5 h-5" /></div>
                <div className="flex-1"><h4 className="font-medium text-white">Instagram</h4><p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">@creative_emman</p></div>
              </a>
              {/* TikTok */}
              <a href="https://www.tiktok.com/@great_emman_wori" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-portfolioTheme-cardBg rounded-xl border border-gray-700 hover:border-portfolioTheme-primary transition-all duration-300 hover:shadow-lg hover:shadow-portfolioTheme-primary/20 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-portfolioTheme-primary to-portfolioTheme-accent rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform"><TikTokIcon className="w-5 h-5" /></div>
                <div className="flex-1"><h4 className="font-medium text-white">TikTok</h4><p className="text-sm text-portfolioTheme-textAccent group-hover:text-portfolioTheme-primary transition-colors">@great_emman_wori</p></div>
              </a>
            </div>
          </div>

          {/* Right: form */}
          <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <form onSubmit={handleSubmit} className="bg-portfolioTheme-cardBg p-6 rounded-lg shadow-lg space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name <span className="text-red-500">*</span></label>
                <input id="name" name="name" required className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Your Email <span className="text-red-500">*</span></label>
                <input id="email" name="email" type="email" required className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary" placeholder="Enter your email" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Purpose <span className="text-gray-500">(Optional)</span></label>
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <button type="button" className="w-full p-3 bg-portfolioTheme-secondary border border-gray-700 rounded-md text-left hover:border-portfolioTheme-primary transition-colors">{purpose || "Select purpose"}</button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-96 max-w-[90%] -translate-x-1/2 -translate-y-1/2 bg-portfolioTheme-cardBg p-6 rounded-lg shadow-lg space-y-4">
                      <Dialog.Title className="text-lg font-bold text-white">Choose Purpose</Dialog.Title>
                      <div className="grid grid-cols-1 gap-2">
                        {PURPOSE_OPTIONS.map((opt) => (
                          <Dialog.Close asChild key={opt}>
                            <button type="button" onClick={() => setPurpose(opt)} className="w-full text-left px-3 py-2 rounded-md bg-portfolioTheme-secondary hover:bg-portfolioTheme-primary hover:text-white transition">{opt}</button>
                          </Dialog.Close>
                        ))}
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                <input type="hidden" name="purpose" value={purpose} />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message <span className="text-red-500">*</span></label>
                <textarea id="message" name="message" required rows={5} className="w-full p-3 bg-portfolioTheme-secondary text-portfolioTheme-textMain border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-portfolioTheme-primary resize-none" placeholder="Describe your project or idea..." />
              </div>
              {firstError && <div className="text-sm text-rose-400">{firstError.message || "There was an error, please try again."}</div>}
              <button type="submit" disabled={state.submitting} className="relative w-full inline-flex justify-center items-center gap-3 bg-portfolioTheme-accent text-white px-4 py-3 rounded-md font-semibold transition-all duration-300 overflow-hidden group disabled:opacity-50">
                <span className="relative z-10">{state.submitting ? "Sending..." : "Send Message"}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-[#8F0075] to-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}