import { Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider } from "./context/ThemeContext";

const Index    = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Single AOS init — inside useEffect so React DOM is ready
    AOS.init({
      duration: 650,
      easing: "ease-out-quad",
      once: true,
      offset: 60,
      delay: 0,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return (
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={
            <div role="status" aria-label="Loading content" style={{
              position:"fixed",inset:0,background:"#000",
              display:"flex",alignItems:"center",justifyContent:"center"
            }}>
              <div style={{width:32,height:32,border:"2px solid #6f0414",borderTopColor:"transparent",borderRadius:"50%",animation:"spin 0.7s linear infinite"}}/>
              <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
          }>
            <Routes>
              <Route path="/"  element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
