import { Suspense, useEffect } from "react";
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

const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// SEO Meta Data Configuration
const SEO_CONFIG = {
  siteName: "Great Emman-Wori Portfolio",
  siteUrl: "https://creative-emman.vercel.app",
  title: "Great Emman-Wori | WordPress Developer & Product Designer Portfolio",
  description: "Creative technologist specializing in WordPress development with Elementor & Divi, UI/UX design, and product design. Transform your ideas into high-impact digital experiences. 2+ years experience from Nigeria.",
  image: "https://creative-emman.vercel.app/creative-emman-pic.webp",
  author: "Great Emman-Wori",
  twitterHandle: "@creative_emman",
  locale: "en_US",
};

const App = () => {
  useLenis();

  useEffect(() => {
    // Initialize AOS with optimized settings
    AOS.init({ 
      duration: 1000, 
      once: true, 
      easing: "ease-in-out",
      disable: "mobile" // Disable on mobile for better performance
    });

    // Preload critical images for faster rendering
    const preloadImage = (src: string) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = src;
      document.head.appendChild(link);
    };
    
    preloadImage("https://creative-emman.vercel.app/creative-emman-pic.webp");

    // Add JSON-LD for Organization schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Great Emman-Wori",
      "url": SEO_CONFIG.siteUrl,
      "logo": SEO_CONFIG.image,
      "description": SEO_CONFIG.description,
      "sameAs": [
        "https://linkedin.com/in/creative-emman",
        "https://twitter.com/creative_emman",
        "https://github.com/creative-emman",
        "https://dribbble.com/creative-emman"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+234-XXX-XXX-XXXX",
        "contactType": "Customer Service",
        "email": "contact@creative-emman.com"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Port Harcourt",
        "addressLocality": "Port Harcourt",
        "addressRegion": "Rivers State",
        "postalCode": "500272",
        "addressCountry": "NG"
      }
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script);

  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Suspense fallback={
            <div role="status" aria-label="Loading content">
              <div className="loading-screen">
                <div className="loading-spinner"></div>
              </div>
            </div>
          }>
            <Helmet>
              {/* Primary Meta Tags - SEO CRITICAL */}
              <meta charSet="utf-8" />
              <title>{SEO_CONFIG.title}</title>
              <meta name="title" content={SEO_CONFIG.title} />
              <meta name="description" content={SEO_CONFIG.description} />
              <meta name="author" content={SEO_CONFIG.author} />
              <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
              <meta name="theme-color" content="#8F0075" />
              <meta name="language" content="English" />
              <meta name="revisit-after" content="7 days" />
              <link rel="canonical" href={SEO_CONFIG.siteUrl} />

              {/* Open Graph / Facebook - ENHANCED FOR SOCIAL SHARING */}
              <meta property="og:type" content="website" />
              <meta property="og:url" content={SEO_CONFIG.siteUrl} />
              <meta property="og:title" content={SEO_CONFIG.title} />
              <meta property="og:description" content={SEO_CONFIG.description} />
              <meta property="og:image" content={SEO_CONFIG.image} />
              <meta property="og:image:alt" content="Great Emman-Wori - WordPress Developer and Product Designer" />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
              <meta property="og:site_name" content={SEO_CONFIG.siteName} />
              <meta property="og:locale" content={SEO_CONFIG.locale} />

              {/* Twitter - ENHANCED FOR SOCIAL SHARING */}
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:url" content={SEO_CONFIG.siteUrl} />
              <meta name="twitter:title" content={SEO_CONFIG.title} />
              <meta name="twitter:description" content={SEO_CONFIG.description} />
              <meta name="twitter:image" content={SEO_CONFIG.image} />
              <meta name="twitter:image:alt" content="Great Emman-Wori - WordPress Developer and Product Designer" />
              <meta name="twitter:creator" content={SEO_CONFIG.twitterHandle} />

              {/* Security & Performance */}
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="format-detection" content="telephone=no" />
              
              {/* Preconnect for External Resources */}
              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
              
              {/* DNS Prefetch for Analytics & CDN */}
              <link rel="dns-prefetch" href="https://cdn.gpteng.co" />
              <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
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
};

export default App;