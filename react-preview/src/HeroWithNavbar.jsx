import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const COLORS = {
  paper: "#EFEAE0",
  ink: "#241F1A",
  ochre: "#A85C2A",
  overlayDark: "rgba(20,16,12,0.86)",
};

const DEFAULT_CHAPTERS = [
  {
    number: "01",
    title: "Western Australia's Pristine Shores",
    section: "Section I — The Coastal Wonders",
    description: "Turquoise Bay's waters melt into the horizon near Ningaloo Reef, while kangaroos laze on the dazzling white sands of Lucky Bay.",
    thumbnail: "https://images.unsplash.com/photo-1534570122623-99e8378a9aa7?w=800&h=1000&q=80&fm=jpg&fit=crop&auto=format",
    href: "#chapter-1",
  },
  {
    number: "02",
    title: "Victoria's Southern Coastline",
    section: "Section I — The Coastal Wonders",
    description: "The Great Ocean Road winds along dramatic cliffs to the Twelve Apostles — limestone sentinels rising from the Southern Ocean.",
    thumbnail: "https://images.unsplash.com/photo-1496482475496-a91f31e0386c?w=800&h=1000&q=80&fm=jpg&fit=crop&auto=format",
    href: "#chapter-2",
  },
  {
    number: "03",
    title: "New South Wales' Coastal Jewels",
    section: "Section I — The Coastal Wonders",
    description: "Sydney Harbour Bridge and the Opera House frame the skyline, while the Bondi to Coogee walk reveals hidden coves beyond the buzz.",
    thumbnail: "https://images.unsplash.com/photo-1744367624689-6bf2ef09ea28?w=800&h=1000&q=80&fm=jpg&fit=crop&auto=format",
    href: "#chapter-3",
  },
  {
    number: "04",
    title: "Western Australia's Desert Wonders",
    section: "Section II — The Untamed Outback",
    description: "The otherworldly Pinnacles rise from golden sand, while Kalbarri's red-and-white sandstone gorges cut through an ancient land.",
    thumbnail: "https://images.unsplash.com/photo-1777432033552-5b34be22ae46?w=800&h=1000&q=80&fm=jpg&fit=crop&auto=format",
    href: "#chapter-4",
  },
];

// Exactly 3 images for the ambient background
const CAROUSEL_IMAGES = [
  "https://images.unsplash.com/photo-1534570122623-99e8378a9aa7?w=1600&q=80&fm=jpg&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1496482475496-a91f31e0386c?w=1600&q=80&fm=jpg&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1744367624689-6bf2ef09ea28?w=1600&q=80&fm=jpg&fit=crop&auto=format",
];

function LogoMark({ size = 40, color = "#EFEAE0" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <circle cx="16" cy="16" r="14.2" stroke={color} strokeWidth="1.3" />
      <path d="M3 19.5 H29" stroke={color} strokeWidth="1.3" />
      <circle cx="16" cy="13.5" r="3.4" fill={color} />
      <path d="M16 3 V6.5 M16 25.5 V29 M3 16 H6.5 M25.5 16 H29" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export default function HeroWithNavbar({
  title = "Wonderful World",
  subtitle = "Australia's Majestic Landscapes",
  tagline = "Seascapes · Coastlines · Cityscapes · Nightscapes\nThrough the Lens of Alok Sardana",
  chapters = DEFAULT_CHAPTERS,
}) {
  const [slide, setSlide] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const navRef = useRef(null);
  
  const shouldReduceMotion = useReducedMotion();

  // 1. Auto-rotating continuous carousel (~5-6s)
  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % 3), 5500);
    return () => clearInterval(id);
  }, []);

  // Scroll detection for Navbar background
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close mega menu on outside click
  useEffect(() => {
    const onClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const groupedChapters = chapters.reduce((acc, ch) => {
    (acc[ch.section] = acc[ch.section] || []).push(ch);
    return acc;
  }, {});
  const activeChapter = chapters[activeIdx];

  // Animation variants
  const navDuration = shouldReduceMotion ? 0 : 0.6;
  const navVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -20 },
    visible: { opacity: 1, y: 0, transition: { duration: navDuration, ease: "easeOut" } }
  };

  const textDelay = shouldReduceMotion ? 0 : navDuration;
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div style={{ position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Inter:wght@300;400;500;600&display=swap');
        .ww-serif { font-family: 'Fraunces', serif; }
        .ww-sans { font-family: 'Inter', sans-serif; }
        
        .desktop-nav { display: flex; }
        .mobile-toggle { display: none; }
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {/* ---- Navbar: Fixed, clean, no overlapping text ---- */}
      <motion.nav
        ref={navRef}
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="ww-sans"
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          backgroundColor: scrolled || menuOpen ? COLORS.overlayDark : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(12px)" : "none",
          borderBottom: (scrolled || menuOpen) ? "1px solid rgba(239,234,224,0.12)" : "1px solid transparent",
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px" }}>
          {/* Logo & Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <LogoMark size={34} color={COLORS.paper} />
            <span className="ww-serif" style={{ fontSize: "22px", color: COLORS.paper, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              {title}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="desktop-nav" style={{ alignItems: "center", gap: "40px" }}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none", border: "none", cursor: "pointer", color: COLORS.paper,
                fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 500,
                paddingBottom: "4px", borderBottom: `1px solid ${menuOpen ? COLORS.ochre : "transparent"}`,
                transition: "border-color 200ms"
              }}
            >
              Chapters
            </button>
            <a
              href="#about"
              style={{
                color: COLORS.paper, fontSize: "12px", textTransform: "uppercase",
                letterSpacing: "0.15em", fontWeight: 500, textDecoration: "none"
              }}
            >
              About the Photographer
            </a>
            <a
              href="#book"
              style={{
                color: COLORS.ochre, fontSize: "12px", textTransform: "uppercase",
                letterSpacing: "0.15em", fontWeight: 500, textDecoration: "none",
                borderBottom: `1px solid ${COLORS.ochre}`, paddingBottom: "4px"
              }}
            >
              The Book
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(true)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
            aria-label="Open menu"
          >
            <Menu color={COLORS.paper} size={28} />
          </button>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", borderTop: "1px solid rgba(239,234,224,0.08)" }}
            >
              <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px", position: "relative", display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "60px" }}>
                <div>
                  {Object.entries(groupedChapters).map(([section, chs]) => (
                    <div key={section} style={{ marginBottom: "32px" }}>
                      <p style={{ color: COLORS.ochre, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>
                        {section}
                      </p>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                        {chs.map((ch) => {
                          const globalIdx = chapters.indexOf(ch);
                          return (
                            <li key={ch.title}>
                              <a
                                href={ch.href || "#"}
                                onMouseEnter={() => setActiveIdx(globalIdx)}
                                onFocus={() => setActiveIdx(globalIdx)}
                                className="ww-serif"
                                style={{ display: "block", color: COLORS.paper, fontSize: "22px", padding: "8px 0", opacity: activeIdx === globalIdx ? 1 : 0.5, transition: "opacity 200ms ease", textDecoration: "none" }}
                              >
                                {ch.number} — {ch.title}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <motion.div key={activeIdx} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                  <div style={{ overflow: "hidden", borderRadius: "2px", marginBottom: "20px", aspectRatio: "4 / 5", backgroundColor: "#111" }}>
                    <img src={activeChapter.thumbnail} alt={activeChapter.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <p style={{ color: COLORS.ochre, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "10px" }}>{activeChapter.section}</p>
                  <p className="ww-serif" style={{ color: COLORS.paper, fontSize: "20px", marginBottom: "12px" }}>{activeChapter.title}</p>
                  <p style={{ color: "rgba(239,234,224,0.75)", fontSize: "14px", lineHeight: 1.6 }}>{activeChapter.description}</p>
                </motion.div>
                <button onClick={() => setMenuOpen(false)} aria-label="Close menu" style={{ position: "absolute", top: "24px", right: "24px", background: "none", border: "none", cursor: "pointer" }}>
                  <X color={COLORS.paper} size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="ww-sans"
            style={{ position: "fixed", inset: 0, zIndex: 80, backgroundColor: COLORS.ink, display: "flex", flexDirection: "column" }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px" }}>
              <span className="ww-serif" style={{ color: COLORS.paper, fontSize: "22px" }}>{title}</span>
              <button onClick={() => setMobileOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                <X color={COLORS.paper} size={28} />
              </button>
            </div>
            <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "24px", overflowY: "auto" }}>
              {chapters.map((ch) => (
                <a key={ch.title} href={ch.href} className="ww-serif" style={{ color: COLORS.paper, fontSize: "24px", textDecoration: "none" }} onClick={() => setMobileOpen(false)}>
                  {ch.number} — {ch.title}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------- Hero Section ---------------------------- */}
      <section
        style={{
          position: "relative",
          height: "100vh",
          minHeight: "640px",
          backgroundColor: COLORS.ink,
          overflow: "hidden",
        }}
      >
        {/* 1. Background Carousel (Continuous, Independent) */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <AnimatePresence mode="popLayout">
            <motion.img
              key={slide}
              src={CAROUSEL_IMAGES[slide]}
              alt="Background Landscape"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AnimatePresence>
          
          {/* Dark Overlay Gradient to recede the image and boost text contrast */}
          <div 
            style={{ 
              position: "absolute", inset: 0, 
              background: "linear-gradient(to top, rgba(20,16,12,0.92) 0%, rgba(20,16,12,0.4) 40%, rgba(20,16,12,0.6) 100%)",
              zIndex: 1,
              pointerEvents: "none"
            }} 
          />
        </div>

        {/* 2. Text Content (Book Cover Layout) */}
        <div 
          style={{ 
            position: "relative", 
            zIndex: 10, 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            height: "100%",
            padding: "0 24px",
            textAlign: "center"
          }}
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { delayChildren: textDelay, staggerChildren: 0.15 } }
            }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <motion.h1 
              variants={itemVariants} 
              className="ww-serif" 
              style={{ 
                fontSize: "clamp(56px, 8vw, 110px)", 
                color: COLORS.paper, 
                margin: "0 0 12px 0", 
                fontWeight: 300, 
                letterSpacing: "0.02em", 
                lineHeight: 1.1,
                textShadow: "0 4px 32px rgba(0,0,0,0.8)" 
              }}
            >
              {title}
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="ww-serif" 
              style={{ 
                fontSize: "clamp(20px, 3vw, 32px)", 
                color: "rgba(239,234,224,0.95)", 
                margin: "0 0 40px 0", 
                fontWeight: 300, 
                fontStyle: "italic",
                letterSpacing: "0.02em", 
                textShadow: "0 2px 16px rgba(0,0,0,0.8)" 
              }}
            >
              {subtitle}
            </motion.p>
            
            <motion.div 
              variants={itemVariants} 
              style={{ 
                width: "50px", 
                height: "1px", 
                backgroundColor: COLORS.ochre, 
                margin: "0 0 40px 0", 
                boxShadow: "0 2px 8px rgba(0,0,0,0.5)" 
              }} 
            />
            
            <motion.p 
              variants={itemVariants} 
              className="ww-sans" 
              style={{ 
                fontSize: "12px", 
                color: "rgba(239,234,224,0.75)", 
                margin: "0 0 56px 0", 
                textTransform: "uppercase", 
                letterSpacing: "0.25em", 
                lineHeight: 1.8, 
                maxWidth: "600px",
                textShadow: "0 2px 12px rgba(0,0,0,0.8)" 
              }}
            >
              {tagline.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i === 0 && <><br /><br /></>}
                </span>
              ))}
            </motion.p>

            <motion.div variants={itemVariants}>
              <button 
                onClick={() => document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" })} 
                className="ww-sans"
                style={{ 
                  padding: "16px 40px", 
                  backgroundColor: "transparent", 
                  border: `1px solid ${COLORS.paper}`, 
                  color: COLORS.paper, 
                  fontSize: "11px", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.2em", 
                  fontWeight: 500,
                  cursor: "pointer", 
                  transition: "all 400ms ease",
                  backdropFilter: "blur(4px)" 
                }} 
                onMouseOver={(e) => { 
                  e.currentTarget.style.backgroundColor = COLORS.paper; 
                  e.currentTarget.style.color = COLORS.ink; 
                }} 
                onMouseOut={(e) => { 
                  e.currentTarget.style.backgroundColor = "transparent"; 
                  e.currentTarget.style.color = COLORS.paper; 
                }}
              >
                Discover the Book
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
