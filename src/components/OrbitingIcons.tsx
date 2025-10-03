// src/components/OrbitingIcons.tsx
import React, { useMemo } from "react";
import { FiCode } from "react-icons/fi"; // Full-stack code
import {
  SiWordpress,
  SiFigma,
  SiCanva,
  SiFramer,
  SiGithub,
} from "react-icons/si";

// Orbiting items
export const orbitingItems = [
  <SiGithub key="github" className="h-6 w-6 text-white" />,
  <FiCode key="code" className="h-6 w-6 text-green-400" />,
  <SiWordpress key="wordpress" className="h-6 w-6 text-blue-500" />,
  <SiFramer key="framer" className="h-6 w-6 text-pink-400" />,
  <SiFigma key="figma" className="h-6 w-6 text-[#F24E1E]" />,
  <SiCanva key="canva" className="h-6 w-6 text-[#00C4CC]" />,
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

  // Define the icon connection pairs for arcs
  const connectPairs: [number, number][] = [
    [1, 2], // Code ↔ WordPress
    [1, 0], // Code ↔ GitHub
    [3, 2], // Framer ↔ WordPress
    [4, 5], // Figma ↔ Canva
    [2, 1],
    [0, 1],
    [2, 3],
    [5, 4],
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
              className="absolute flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 shadow-xl ring-1 ring-white/5"
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
