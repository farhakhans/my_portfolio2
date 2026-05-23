import { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  { name: "Sara Lin", role: "Product Lead, Lumen Labs", text: "Alex shipped a design system that lifted our velocity 3x. Best frontend engineer I've worked with — period." },
  { name: "Marcus Reid", role: "Founder, Mintwave", text: "Pixel-perfect execution and zero drama. The onboarding flow Alex built drove a measurable jump in activation." },
  { name: "Priya Shah", role: "CTO, Northstar AI", text: "From concept to launch in three weeks. The interaction polish was the talk of our investor demo." },
  { name: "Tomás García", role: "Designer, Pixelforge", text: "Rare blend of taste and technical depth. Hand off a Figma and trust it'll come back better." },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setI((p) => (p + 1) % items.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="testimonials" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div
        className="floating-blur"
        style={{ width: 500, height: 500, top: "10%", left: -200, background: "oklch(0.8 0.16 155)" }}
      />
      <div className="mx-auto max-w-4xl relative">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Kind <span className="text-gradient">words</span></h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {items.map((t) => (
                <div key={t.name} className="min-w-full px-2">
                  <div className="glass-strong rounded-3xl p-8 sm:p-12 text-center" style={{ boxShadow: "var(--shadow-soft)" }}>
                    <div className="flex justify-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} size={18} className="fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg sm:text-xl leading-relaxed">"{t.text}"</p>
                    <div className="mt-6">
                      <div className="w-14 h-14 mx-auto rounded-full btn-primary grid place-items-center text-lg font-bold">
                        {t.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="mt-3 font-semibold">{t.name}</div>
                      <div className="text-sm text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setI((p) => (p - 1 + items.length) % items.length)}
            className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong grid place-items-center hover:scale-110 transition"
            aria-label="Previous"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setI((p) => (p + 1) % items.length)}
            className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass-strong grid place-items-center hover:scale-110 transition"
            aria-label="Next"
          >
            <ChevronRight size={18} />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-2 rounded-full transition-all ${k === i ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                aria-label={`Slide ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
