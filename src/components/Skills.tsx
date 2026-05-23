import { motion } from "framer-motion";

const skills = [
  { name: "React", level: 95, icon: "⚛️" },
  { name: "HTML", level: 90, icon: "🌐" },
  { name: "CSS", level: 85, icon: "🎨" },
  { name: "JavaScript", level: 88, icon: "⚡" },
  { name: "TypeScript", level: 90, icon: "🟦" },
  { name: "Tailwind CSS", level: 95, icon: "🎨" },
  { name: "Node.js", level: 85, icon: "🟢" },
  { name: "Next.js", level: 88, icon: "▲" },
  { name: "Python", level: 80, icon: "🐍" },
  { name: "UI/UX Design", level: 87, icon: "✨" },
  { name: "AI Tools", level: 82, icon: "🤖" },
  { name: "GitHub", level: 92, icon: "🐙" },
  { name: "Framer Motion", level: 84, icon: "🎬" },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div
        className="floating-blur"
        style={{ width: 500, height: 500, top: "20%", right: -200, background: "oklch(0.85 0.14 155)" }}
      />
      <div className="mx-auto max-w-7xl relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Skills</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">
            Tools I <span className="text-gradient">love using</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="glass rounded-2xl p-5 group hover:-translate-y-1 hover:shadow-[var(--shadow-glow)] transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl group-hover:scale-125 transition-transform">{s.icon}</span>
                  <span className="font-semibold">{s.name}</span>
                </div>
                <span className="text-sm font-semibold text-primary">{s.level}%</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
