import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.floor(p * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

const stats = [
  { value: 80, suffix: "+", label: "Projects Completed" },
  { value: 45, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "y", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Skills Mastered" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">About me</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">
            Designing <span className="text-gradient">delightful</span> products
          </h2>
          <p className="text-muted-foreground mt-5 leading-relaxed">
            I'm a multidisciplinary developer with a passion for building elegant, performant
            interfaces. Over the last five years I've shipped products for startups and enterprises
            across fintech, AI, and creative tooling.
          </p>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            My mission is to bridge engineering excellence with thoughtful design — turning complex
            problems into intuitive experiences people love.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-2xl p-6 hover:scale-[1.03] transition-transform"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <div className="text-4xl sm:text-5xl font-display font-bold text-gradient">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-2 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
