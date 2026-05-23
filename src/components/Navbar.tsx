import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, X, Sun, Moon, LogOut } from "lucide-react";
import { logout, useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#ai", label: "AI Agent" },
  { href: "#education", label: "Education" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = links.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(links[i].href);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 transition-all duration-300 ${
          scrolled ? "" : ""
        }`}
      >
        <nav
          className={`glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between transition-all ${
            scrolled ? "shadow-[var(--shadow-soft)]" : ""
          }`}
        >
          <Link to="/dashboard" className="flex items-center gap-2 font-display font-bold text-lg">
            <span className="w-8 h-8 rounded-xl btn-primary grid place-items-center text-primary-foreground">
              ◆
            </span>
            <span className="text-gradient">Portfolio</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  active === l.href ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {l.label}
                <span
                  className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full transition-all ${
                    active === l.href ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                  style={{ background: "var(--gradient-primary)" }}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="w-9 h-9 grid place-items-center rounded-xl glass hover:scale-105 transition-transform"
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            {user && (
              <button
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-xl btn-secondary"
              >
                <LogOut size={14} /> Logout
              </button>
            )}
            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden w-9 h-9 grid place-items-center rounded-xl glass"
              aria-label="Menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {open && (
          <div className="lg:hidden glass-strong mt-2 rounded-2xl p-3 animate-fade-up">
            <div className="grid gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-accent/40"
                >
                  {l.label}
                </a>
              ))}
              {user && (
                <button
                  onClick={handleLogout}
                  className="text-left px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-accent/40 flex items-center gap-2"
                >
                  <LogOut size={14} /> Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
