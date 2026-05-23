import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, ArrowLeft, Github, Chrome } from "lucide-react";
import { login } from "@/lib/auth";
import { FloatingBlobs } from "@/components/FloatingBlobs";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Alex Carter Portfolio" },
      { name: "description", content: "Sign in to access the full portfolio dashboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@portfolio.dev");
  const [password, setPassword] = useState("demo1234");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@") || password.length < 4) {
      setError("Please enter a valid email and a password of at least 4 characters.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    login(email, password);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
      <FloatingBlobs />

      <Link to="/" className="absolute top-5 left-5 z-10 btn-secondary px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-1.5">
        <ArrowLeft size={14} /> Back
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10"
        style={{ boxShadow: "var(--shadow-glow)" }}
      >
        <div className="text-center mb-7">
          <div className="w-14 h-14 mx-auto rounded-2xl btn-primary grid place-items-center text-2xl animate-glow-pulse">◆</div>
          <h1 className="text-2xl font-bold mt-4">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to view the portfolio dashboard</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={150}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} required maxLength={100}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="accent-[oklch(0.65_0.19_155)]" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-primary hover:underline font-medium">Forgot password?</a>
          </div>

          {error && <div className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{error}</div>}

          <button
            type="submit" disabled={loading}
            className="btn-primary w-full py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <LogIn size={16} /> {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="flex items-center gap-3 my-2">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="btn-secondary py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2">
              <Chrome size={16} /> Google
            </button>
            <button type="button" className="btn-secondary py-2.5 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-2">
              <Github size={16} /> GitHub
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Don't have an account? <a href="#" className="text-primary font-semibold hover:underline">Register</a>
          </p>
        </form>
      </motion.div>
    </div>
  );
}
