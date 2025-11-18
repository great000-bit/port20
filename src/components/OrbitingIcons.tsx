// src/components/OrbitingIcons.tsx
import React, { useMemo } from "react";
import { FiCode } from "react-icons/fi"; // Full-stack code
import {
  SiWordpress,
  SiFigma,
  SiCanva,
  SiFramer,
  SiGithub,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiTailwindcss,
} from "react-icons/si";

// Orbiting items with enhanced tech stack
export const orbitingItems = [
  <SiReact key="react" className="h-6 w-6 text-[#61DAFB]" />, // React
  <SiWordpress key="wordpress" className="h-6 w-6 text-[#21759B]" />, // WordPress
  <SiFigma key="figma" className="h-6 w-6 text-[#F24E1E]" />, // Figma
  <SiTypescript key="typescript" className="h-6 w-6 text-[#3178C6]" />, // TypeScript
  <SiFramer key="framer" className="h-6 w-6 text-[#0055FF]" />, // Framer
  <SiCanva key="canva" className="h-6 w-6 text-[#00C4CC]" />, // Canva
  <SiJavascript key="javascript" className="h-6 w-6 text-[#F7DF1E]" />, // JavaScript
  <SiTailwindcss key="tailwind" className="h-6 w-6 text-[#06B6D4]" />, // Tailwind CSS
  <SiHtml5 key="html" className="h-6 w-6 text-[#E34F26]" />, // HTML5
  <SiCss3 key="css" className="h-6 w-6 text-[#1572B6]" />, // CSS3
  <SiGithub key="github" className="h-6 w-6 text-white" />, // GitHub
  <FiCode key="code" className="h-6 w-6 text-green-400" />, // Full-stack
];

interface OrbitingItemsProps {
  radius?: number;
  items?: React.ReactNode[];
  pauseOnHover?: boolean;
  className?: string;
}

const calculateItemStyle = ({
  index,
  radius,
  totalItems,
}: {
  radius: number;
  index: number;
  totalItems: number;
}) => {
  const angle = (index / totalItems) * 360;
  const radians = (angle * Math.PI) / 180;
  const x = radius * Math.cos(radians);
  const y = radius * Math.sin(radians);
  return { x, y };
};

export default function OrbitingItems({
  radius = 40,
  items = orbitingItems,
  pauseOnHover = true,
  className = "",
}: OrbitingItemsProps) {
  const total = items.length;
  const positions = useMemo(
    () =>
      items.map((_, index) =>
        calculateItemStyle({ index, radius, totalItems: total })
      ),
    [items, radius, total]
  );

  const parentRotationClass = "animate-rotate-full";
  const innerReverseClass =
    "animate-[rotate-full_45s_linear_infinite_reverse]";

  // Define the icon connection pairs for arcs - updated for 12 items
  const connectPairs: [number, number][] = [
    [0, 1], // React ↔ WordPress
    [1, 2], // WordPress ↔ Figma
    [2, 3], // Figma ↔ TypeScript
    [3, 4], // TypeScript ↔ Framer
    [4, 5], // Framer ↔ Canva
    [5, 6], // Canva ↔ JavaScript
    [6, 7], // JavaScript ↔ Tailwind
    [7, 8], // Tailwind ↔ HTML5
    [8, 9], // HTML5 ↔ CSS3
    [9, 10], // CSS3 ↔ GitHub
    [10, 11], // GitHub ↔ Code
    [11, 0], // Code ↔ React (complete the circle)
    [0, 3], // React ↔ TypeScript (cross connections)
    [2, 5], // Figma ↔ Canva
    [1, 4], // WordPress ↔ Framer
    [6, 9], // JavaScript ↔ CSS3
  ];

  return (
    <div
      className={`relative flex items-center justify-center py-12 ${
        pauseOnHover ? "group" : ""
      }`}
    >
      <div
        className={`relative flex h-80 w-80 items-center justify-center ${parentRotationClass} ${className}`}
      >
        {/* Outer orbit ring */}
        <div className="absolute h-full w-full rounded-full border border-gray-600/30" />

        {/* SVG glowing arcs + particles */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="arcGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fea908" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#fea908" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {connectPairs.map(([a, b], i) => {
            const pa = positions[a];
            const pb = positions[b];
            const cx = (pa.x + pb.x) / 2;
            const cy = (pa.y + pb.y) / 2 - 10;

            const pathId = `path-${i}`;

            return (
              <g key={i}>
                {/* Arc */}
                <path
                  id={pathId}
                  d={`M ${50 + pa.x}%,${50 + pa.y}% Q ${50 + cx}%,${50 + cy}% ${
                    50 + pb.x
                  }%,${50 + pb.y}%`}
                  stroke="url(#arcGrad)"
                  strokeWidth={1.8}
                  fill="none"
                  style={{
                    filter: "url(#glow)",
                    opacity: 0.9,
                  }}
                />

                {/* Particle (dot) moving along arc */}
                <circle r="2" fill="#fea908">
                  <animateMotion
                    dur="6s"
                    repeatCount="indefinite"
                    rotate="auto"
                  >
                    <mpath href={`#${pathId}`} />
                  </animateMotion>
                </circle>
              </g>
            );
          })}
        </svg>

        {/* Orbiting icons */}
        {items.map((item, i) => {
          const pos = positions[i];
          return (
            <div
              key={i}
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 shadow-xl ring-1 ring-white/5 hover:scale-110 transition-transform duration-300"
              style={{
                left: `${50 + pos.x}%`,
                top: `${50 + pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className={innerReverseClass}>{item}</div>
            </div>
          );
        })}

        {/* Center glowing core */}
        <div className="absolute h-16 w-16 rounded-full bg-portfolioTheme-accent shadow-2xl blur-md" />
        <div
          className={`${innerReverseClass} absolute h-1/2 w-1/2 rounded-full border border-portfolioTheme-accent/40`}
        />
      </div>
    </div>
  );
}