import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Twitter } from "lucide-react";
import profileImg from "@/assets/picf1.png";
import { Typewriter } from "./Typewriter";
import { FloatingBlobs } from "./FloatingBlobs";
import { useRef, useState } from "react";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <FloatingBlobs />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-glow-pulse" />
            Available for new projects
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
            Hi, I'm <span className="text-gradient-animated">Farhana Khan</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-foreground/80 font-semibold">
              I'm a <Typewriter
                className="text-gradient"
                words={["Frontend Developer", "UI/UX Designer", "AI Enthusiast", "Creative Coder"]}
              />
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            I craft modern, interactive web experiences with a focus on performance, accessibility,
            and delightful micro-interactions. Let's build something exceptional.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
              <Mail size={16} /> Hire Me
            </a>
            <a href="#projects" className="btn-secondary px-6 py-3 rounded-xl font-semibold">
              View Portfolio
            </a>
            <CVControls />
          </div>
          <div className="flex items-center gap-3 pt-2">
            {[
              { Icon: Github, label: "GitHub" },
              { Icon: Linkedin, label: "LinkedIn" },
              { Icon: Twitter, label: "Twitter" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-11 h-11 grid place-items-center rounded-xl glass hover:scale-110 hover:text-primary transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div className="relative">
            <div
              className="absolute -inset-6 rounded-full opacity-70 animate-glow-pulse"
              style={{ background: "var(--gradient-primary)", filter: "blur(40px)" }}
            />
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full p-1.5 animate-[float_6s_ease-in-out_infinite]"
                 style={{ background: "var(--gradient-primary)" }}>
              <div className="w-full h-full rounded-full overflow-hidden bg-card glow-ring">
                <img src={profileImg} alt="Profile" width={384} height={384} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="absolute -top-3 -right-3 glass-strong rounded-2xl px-4 py-2 text-sm font-semibold shadow-[var(--shadow-soft)] animate-[float_5s_ease-in-out_infinite]">
              ⚡ 5+ years
            </div>
            <div className="absolute -bottom-3 -left-3 glass-strong rounded-2xl px-4 py-2 text-sm font-semibold shadow-[var(--shadow-soft)] animate-[float_7s_ease-in-out_infinite_reverse]">
              🚀 80+ projects
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CVControls() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const uploadFile = async (file: File) => {
    // Client-side immediate download (no server upload) — preserves original file contents.
    setMessage(null);
    setLoading(true);
    try {
      const url = URL.createObjectURL(file);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name || "resume.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setMessage("Download started");
      // revoke after a short delay
      setTimeout(() => URL.revokeObjectURL(url), 60_000);
    } catch (err) {
      console.error(err);
      setMessage("Download failed");
    } finally {
      setLoading(false);
    }
  };

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) uploadFile(f);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const triggerPicker = () => fileInputRef.current?.click();

  return (
    <>
      <button onClick={triggerPicker} className="btn-secondary px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2">
        Upload CV
      </button>
      {message && <div className="mt-2 text-sm text-foreground/80">{message}</div>}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        className="hidden"
        onChange={onSelectFile}
      />
    </>
  );
}
