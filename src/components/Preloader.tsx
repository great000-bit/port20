import { useEffect, useState } from "react";

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 1000); // wait for fade-out
    }, 4000); // 3s duration

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center 
      bg-gradient-to-br from-portfolioTheme-secondary to-black 
      transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo initials */}
      <div className="relative flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white">
          G<span className="text-portfolioTheme-primary">E.</span>
        </h1>

        {/* Glow ring */}
        <span
          className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full 
          border-2 border-portfolioTheme-primary opacity-50 animate-ping"
        ></span>
        <span
          className="absolute w-44 h-44 md:w-64 md:h-64 rounded-full 
          border border-portfolioTheme-accent opacity-30 animate-pulse"
        ></span>
      </div>
    </div>
  );
};

export default Preloader;
