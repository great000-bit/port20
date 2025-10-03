import { Suspense, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
import { useLenis } from "@/hooks/useLenis";
import AOS from "aos";
import "aos/dist/aos.css";

// 👇 Import Preloader
import Preloader from "@/components/Preloader";

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useLenis();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });

    // Wait until preloader finishes
    const timer = setTimeout(() => setIsLoaded(true), 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {!isLoaded ? (
          <Preloader />
        ) : (
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <Helmet>
                <meta charSet="utf-8" />
                <title>
                  Creative Emman | WordPress Developer & Product Designer
                </title>
                <meta
                  name="description"
                  content="Portfolio of Creative Emman, a WordPress Developer and Product Designer from Nigeria with over 2 years of experience."
                />
                <meta name="author" content="Creative Emman" />
                <meta property="og:type" content="website" />
                <meta
                  property="og:image"
                  content="https://example.com/path-to-image.jpg"
                />
                <meta property="og:url" content="https://yourwebsite.com" />
              </Helmet>

              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
