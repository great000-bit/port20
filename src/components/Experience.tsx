const EXP = [
  {
    role: "UI/UX Designer",
    org: "Bourdillon Omijeh Foundation",
    loc: "Port Harcourt, Nigeria",
    period: "Jun 2025 – Present",
    bullets: [
      "Designed and launched a responsive website that increased visitor engagement by 55% within 3 months",
      "Conducted usability testing with 20+ users, reducing bounce rate by 35%",
      "Improved accessibility score from 68 to 92 using WCAG-compliant design practices",
      "Boosted organic traffic by 40% through SEO-aligned structure and metadata optimization",
    ],
    tags: ["Figma","UI/UX","WordPress","SEO","Accessibility"],
  },
  {
    role: "WordPress Developer",
    org: "Bellostylez",
    loc: "Remote · Canada",
    period: "May 2025 – Present",
    bullets: [
      "Developed and deployed a fashion blog achieving 1,500+ monthly visitors within the first quarter",
      "Reduced page load time by 2.5 seconds, improving Core Web Vitals and mobile experience",
      "Implemented SEO strategies that led to a 60% increase in Google search impressions",
      "Achieved 98% mobile responsiveness across devices using Divi and custom CSS",
    ],
    tags: ["WordPress","Divi","SEO","Core Web Vitals","Responsive"],
  },
  {
    role: "UI/UX Designer",
    org: "SuiBiz — Hackathon Project",
    loc: "Remote · Nigeria",
    period: "Jul 2025 – Present",
    bullets: [
      "Co-led design of a Web3 marketplace that won 2nd place out of 50+ teams in a national hackathon",
      "Created 15+ reusable Figma components, accelerating development by 30%",
      "Conducted competitor analysis that improved task completion rate by 35%",
    ],
    tags: ["Figma","Web3","UI/UX","Design System","Hackathon — 2nd Place"],
  },
  {
    role: "WordPress Developer",
    org: "YouthUp Global Pathways",
    loc: "Remote · Nigeria",
    period: "Jun 2025 – Present",
    bullets: [
      "Built a multilingual site serving users from 5 countries with 3,000+ active monthly users",
      "Integrated plugins for registration and community engagement, increasing sign-ups by 75%",
      "Enhanced site speed by 40% through caching and image optimization, improving retention",
    ],
    tags: ["WordPress","Elementor","Multilingual","SEO","Performance"],
  },
  {
    role: "UI/UX Designer",
    org: "AdsFirr",
    loc: "Port Harcourt, Nigeria",
    period: "2025",
    bullets: [
      "Designed an ad campaign dashboard that reduced user friction by 30% based on analytics",
      "Increased user satisfaction score from 3.2 to 4.6/5 through iterative design improvements",
      "Delivered MVP in 3 weeks, enabling early-stage fundraising and stakeholder buy-in",
    ],
    tags: ["Figma","Dashboard","UI/UX","Product Design","Analytics"],
  },
  {
    role: "UI/UX Designer",
    org: "HairBrosh UI Kit",
    loc: "Port Harcourt, Nigeria",
    period: "2025",
    bullets: [
      "Developed a scalable UI Kit with 40+ components, used by 5+ startups in salon tech",
      "Reduced design-to-development handoff time by 50% through standardised components",
      "Achieved 100% responsiveness across desktop, tablet, and mobile platforms",
    ],
    tags: ["Figma","UI Kit","Design System","Responsive","Component Library"],
  },
  {
    role: "Digital Operations & Technology Lead",
    org: "Phatbird Fashion Brand",
    loc: "Remote · UK",
    period: "2024 – Present",
    bullets: [
      "Managed Meta Ads and Google Ads campaigns, producing CEO-facing performance reports",
      "Evaluated and integrated AI toolchains — HeyGen, Seedance 2.0, Runway ML, Kling AI",
      "Optimised Shopify store: responsiveness fixes, interactive size guides, review widgets",
      "Handled digital workflow automation, Google Drive organisation, and meeting documentation",
    ],
    tags: ["Meta Ads","Shopify","Google Ads","AI Tooling","Digital Ops"],
  },
  {
    role: "Fullstack Website Developer",
    org: "The Light Mission NGO",
    loc: "Remote · Nigeria",
    period: "2024",
    bullets: [
      "Built a full-stack Laravel 12 + React/TypeScript event registration system from scratch",
      "Implemented Sanctum authentication, enrollment form, and admin CSV export dashboard",
      "Integrated Facebook Pixel CompleteRegistration for real-time conversion monitoring",
    ],
    tags: ["Laravel","React","TypeScript","Sanctum","Facebook Pixel"],
  },
  {
    role: "Frontend Developer & Product Designer",
    org: "Nollywood Talent Portfolio Projects",
    loc: "Remote · Nigeria",
    period: "2023 – 2024",
    bullets: [
      "Built premium React portfolio sites for Funke Akindele, Timini Egbuson, Ego Nwosu, and Omoni Oboli",
      "Delivered cinematic dark-aesthetic designs with smooth animations and full mobile responsiveness",
      "Optimised all deliverables for Core Web Vitals, SEO metadata, and social sharing previews",
    ],
    tags: ["React","TypeScript","Vite","Portfolio Design","Frontend"],
  },
  {
    role: "Web Designer & WordPress Developer",
    org: "International Client Projects",
    loc: "Remote · Nigeria / Canada",
    period: "2022 – 2024",
    bullets: [
      "Built WordPress sites for YouthUp Global, Bellostylez (Canada), and Bourdillon Foundation",
      "Delivered SEO-optimised, accessible builds using Elementor and Divi builders",
      "Designed UI/UX for Hair Brosh Saloon, AdsFirr, and WaContacts using Figma",
    ],
    tags: ["WordPress","Elementor","Divi","Figma","UI/UX","SEO"],
  },
  {
    role: "UI/UX Designer",
    org: "Digital Nexus AI",
    loc: "Remote · India",
    period: "Jan 2018 – Jun 2025",
    bullets: [
      "Designed interfaces for AI-driven tools, simplifying complex features for end users",
      "Participated in usability testing and design reviews, improving accessibility scores",
    ],
    tags: ["Figma","UI/UX","AI Tools","Accessibility"],
  },
  {
    role: "UI/UX Designer",
    org: "Hyperbird Digital Technologies",
    loc: "Remote · Nigeria",
    period: "Jan 2018 – Jun 2025",
    bullets: [
      "Supported design of responsive web and mobile interfaces across diverse industries",
      "Created wireframes and prototypes that enhanced user satisfaction and client delivery",
    ],
    tags: ["Figma","Wireframing","Prototyping","Responsive Design"],
  },
];

export default function Experience() {
  return (
    <section id="experience" style={{ background:"#030303", padding:"clamp(80px,12vh,120px) 0" }}>
      <style>{`
        .exp-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 clamp(24px,5vw,64px);
        }
        .exp-eyebrow {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(255,255,255,0.20);
          display: block; margin-bottom: 20px;
        }
        .exp-heading {
          font-family: Geist,Arial,sans-serif;
          font-size: clamp(28px,3.5vw,42px);
          font-weight: 400; letter-spacing: -0.04em;
          color: #fff; margin: 0 0 64px 0;
        }
        /* Timeline container */
        .exp-timeline {
          position: relative;
          padding-left: 28px;
        }
        /* Left rail line */
        .exp-timeline::before {
          content: "";
          position: absolute;
          left: 0; top: 6px; bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.07);
        }
        /* Each entry */
        .exp-entry {
          position: relative;
          padding-bottom: 56px;
        }
        .exp-entry:last-child { padding-bottom: 0; }
        /* Dot on the rail */
        .exp-dot {
          position: absolute;
          left: -34px; top: 6px;
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--accent);
          border: 2px solid #030303;
          box-shadow: 0 0 0 1px var(--accent);
        }
        /* Period label */
        .exp-period {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 10px;
          display: block;
        }
        /* Role */
        .exp-role {
          font-family: Geist,Arial,sans-serif;
          font-size: 18px; font-weight: 600;
          color: #fff; margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }
        /* Org + loc */
        .exp-org {
          font-family: Arial,sans-serif;
          font-size: 13px; color: rgba(255,255,255,0.40);
          margin-bottom: 20px;
        }
        /* Bullets */
        .exp-bullets {
          list-style: none;
          padding: 0; margin: 0 0 18px 0;
          display: flex; flex-direction: column; gap: 8px;
        }
        .exp-bullet {
          font-family: Arial,sans-serif;
          font-size: 14px; line-height: 1.65;
          color: rgba(255,255,255,0.48);
          display: flex; gap: 10px;
        }
        .exp-bullet::before {
          content: "—";
          color: var(--accent);
          flex-shrink: 0;
          font-size: 12px;
          margin-top: 2px;
        }
        /* Tags */
        .exp-tags {
          display: flex; flex-wrap: wrap; gap: 6px;
        }
        .exp-tag {
          font-family: Arial,sans-serif;
          font-size: 11px; font-weight: 500;
          color: rgba(255,255,255,0.30);
          padding: 3px 10px; border-radius: 4px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
        }
        /* Divider between entries */
        .exp-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin-bottom: 48px;
        }
        @media (max-width: 640px) {
          .exp-timeline { padding-left: 20px; }
          .exp-dot { left: -26px; }
          .exp-role { font-size: 16px; }
        }
      `}</style>

      <div className="exp-wrap">
        <div data-aos="fade-up">
          <span className="exp-eyebrow">05 — Experience</span>
          <h2 className="exp-heading">Work Experience</h2>
        </div>

        <div className="exp-timeline">
          {EXP.map((e, i) => (
            <div key={i} className="exp-entry" data-aos="fade-up" data-aos-delay={i * 80}>
              <div className="exp-dot" />
              <span className="exp-period">{e.period}</span>
              <h3 className="exp-role">{e.role}</h3>
              <p className="exp-org">{e.org} · {e.loc}</p>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => (
                  <li key={j} className="exp-bullet">{b}</li>
                ))}
              </ul>
              <div className="exp-tags">
                {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
              </div>
              {i < EXP.length - 1 && <div className="exp-divider" style={{ marginTop: 40 }} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
