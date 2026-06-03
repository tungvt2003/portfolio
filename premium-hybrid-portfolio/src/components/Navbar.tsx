import { useState, useEffect } from "react";
import { MessageSquare, Globe, Sun, Moon, Sparkles, Menu, X } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  onHireMeClick: () => void;
  onDownloadCVClick: () => void;
}

export default function Navbar({ onHireMeClick, onDownloadCVClick }: NavbarProps) {
  const { name, logo } = PORTFOLIO_DATA.profile;
  const [activeTab, setActiveTab] = useState("projects");
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [lang, setLang] = useState<"EN" | "VN">("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Determine active section based on scroll position
      const sections = ["projects", "experience", "education", "skills", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setActiveTab(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <header
      id="main-nav-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-cyber-dark/80 backdrop-blur-md py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-12">
        {/* LOGO AREA */}
        <div 
          className="flex cursor-pointer items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-cyber-blue/30 bg-cyber-dark/40 shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <img
              src={logo}
              alt="VT logo"
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-bold text-white tracking-wide text-md hidden sm:inline-block">
            {name}
          </span>
        </div>

        {/* NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-1 rounded-full border border-white/5 bg-slate-900/40 px-2 py-1.5 backdrop-blur-sm">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`relative rounded-full px-5 py-1.5 font-sans text-xs font-medium tracking-wide transition-all duration-200 outline-none ${
                activeTab === item.id ? "text-cyber-blue" : "text-slate-400 hover:text-white"
              }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full bg-cyber-blue/10 border border-cyber-blue/20"
                  style={{ originY: "0px" }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* ACTION / PREFERENCE TOGGLES */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Language Selector */}
          <button
            onClick={() => setLang(lang === "EN" ? "VN" : "EN")}
            className="flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 font-sans text-[11px] font-semibold text-slate-300 transition hover:bg-white/5"
            title="Switch Language"
          >
            <Globe size={13} className="text-cyber-blue animate-pulse" />
            <span>{lang}</span>
          </button>

          {/* Theme Selector */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-lg border border-white/10 p-2 text-slate-300 transition hover:bg-white/5"
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Cyber Dark"}
          >
            {theme === "dark" ? (
              <Sun size={13} className="text-amber-400" />
            ) : (
              <Moon size={13} className="text-cyber-sky" />
            )}
          </button>

          <button
            id="hire-me-btn"
            onClick={onHireMeClick}
            className="flex items-center gap-1.5 rounded-lg bg-cyber-blue px-4 py-2 font-display text-xs font-semibold text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)] transition hover:brightness-110 active:scale-95"
          >
            <MessageSquare size={12} />
            <span>Hire me</span>
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Language */}
          <button
            onClick={() => setLang(lang === "EN" ? "VN" : "EN")}
            className="flex items-center gap-1 rounded-lg border border-white/10 px-2 py-1.5 font-sans text-[10px] font-semibold text-slate-300"
          >
            <Globe size={11} className="text-cyber-blue" />
            <span>{lang}</span>
          </button>

          {/* Hire Me Core */}
          <button
            onClick={onHireMeClick}
            className="rounded-lg bg-cyber-blue px-3 py-1.5 font-display text-xs font-semibold text-slate-950 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
          >
            <span>Hire</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-white/10 p-1.5 text-white"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAV MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-b border-white/5 bg-cyber-dark/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-1 px-8 py-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition ${
                    activeTab === item.id
                      ? "bg-cyber-blue/10 text-cyber-blue"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  {activeTab === item.id && <Sparkles size={14} />}
                </button>
              ))}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onDownloadCVClick();
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-800/40 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Download CV
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
