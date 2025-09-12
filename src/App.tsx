import { Suspense } from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";

// Lazy-load the pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          {/* Helmet for SEO */}
          <Helmet>
            <meta charSet="utf-8" />
            <title>Creative Emman | WordPress Developer & Product Designer</title>
            <meta
              name="description"
              content="Portfolio of Creative Emman, a WordPress Developer and Product Designer from Nigeria with over 2 years of experience."
            />
            <meta name="author" content="Creative Emman" />

            {/* Open Graph Meta Tags for social media */}
            <meta
              property="og:title"
              content="Creative Emman | WordPress Developer & Product Designer"
            />
            <meta
              property="og:description"
              content="Portfolio of Creative Emman, a WordPress Developer and Product Designer from Nigeria with over 2 years of experience."
            />
            <meta property="og:type" content="website" />
            <meta
              property="og:image"
              content="https://example.com/path-to-image.jpg" // Replace with your image URL
            />
            <meta property="og:url" content="https://yourwebsite.com" />
          </Helmet>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
