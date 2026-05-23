import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, LogIn, Eye, Sparkles, Github, Linkedin, Twitter } from "lucide-react";
import { Typewriter } from "@/components/Typewriter";
import { FloatingBlobs } from "@/components/FloatingBlobs";
import { AIWidget } from "@/components/AIWidget";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { Moon, Sun } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alex Carter — Frontend Developer & UI/UX Designer" },
      { name: "description", content: "Premium portfolio of Farhana Khan — modern web experiences, design systems, and AI-powered products." },
      { property: "og:title", content: "Farhana Khan — Portfolio" },
      { property: "og:description", content: "Premium portfolio: modern web experiences with delightful UX." },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { user, ready } = useAuth();
  const { theme, toggle } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) navigate({ to: "/dashboard" });
  }, [ready, user, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <FloatingBlobs />

      <div className="relative z-10">
        <header className="px-4 sm:px-6 py-5">
          <div className="mx-auto max-w-7xl glass-strong rounded-2xl px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-8 h-8 rounded-xl btn-primary grid place-items-center">◆</span>
              <span className="text-gradient">Portfolio</span>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={toggle} className="w-9 h-9 grid place-items-center rounded-xl glass hover:scale-105 transition" aria-label="Toggle theme">
                {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <Link to="/login" className="btn-secondary px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5">
                <LogIn size={14} /> Login
              </Link>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 sm:px-6 py-16 sm:py-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-medium text-primary"
          >
            <Sparkles size={14} /> Welcome to my portfolio
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold mt-6 leading-[1.02]"
          >
            Hi, I'm <span className="text-gradient-animated">Farhana Khan </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-2xl sm:text-3xl mt-4 font-semibold text-foreground/80"
          >
            <Typewriter
              className="text-gradient"
              words={["Frontend Developer", "UI/UX Designer", "AI Enthusiast", "Creative Web Developer"]}
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Sign in to explore the full portfolio dashboard — projects, skills, and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            <Link to="/login" className="btn-primary px-7 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2">
              <LogIn size={16} /> Login
            </Link>
            <Link to="/login" className="btn-secondary px-7 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2">
              <Eye size={16} /> View Portfolio <ArrowRight size={16} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-12 flex justify-center gap-3"
          >
            {[Github, Linkedin, Twitter].map((Icon, k) => (
              <a key={k} href="#" className="w-11 h-11 grid place-items-center rounded-xl glass hover:scale-110 hover:text-primary transition-all">
                <Icon size={18} />
              </a>
            ))}
          </motion.div>
          <AIWidget />
        </main>
      </div>
    </div>
  );
}
