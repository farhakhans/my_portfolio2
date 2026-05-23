import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";

export function Footer() {
  const top = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="relative mt-16 px-4 sm:px-6 pb-10">
      <div className="mx-auto max-w-7xl glass-strong rounded-3xl p-8 sm:p-12" style={{ boxShadow: "var(--shadow-soft)" }}>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div>
            <div className="flex items-center gap-2 font-display font-bold text-lg">
              <span className="w-8 h-8 rounded-xl btn-primary grid place-items-center">◆</span>
              <span className="text-gradient">Farhana Khan</span> </div>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Crafting modern web experiences with care, taste, and a sprinkle of magic.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Quick links</div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {["About", "Skills", "Projects", "Testimonials", "Contact"].map((l) => (
                <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-primary transition">{l}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-3">Connect</div>
            <div className="flex gap-2">
              {[Github, Linkedin, Twitter, Mail].map((Icon, k) => (
                <a key={k} href="#" className="w-10 h-10 grid place-items-center rounded-xl glass hover:text-primary hover:scale-110 transition-all">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border/60 mt-8 pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Farhana Khan. All rights reserved.</p>
          <button onClick={top} className="btn-secondary px-4 py-2 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
