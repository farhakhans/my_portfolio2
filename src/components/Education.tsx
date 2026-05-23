import { motion } from "framer-motion";
import { GraduationCap, Award, BookOpen } from "lucide-react";

const items = [
  { icon: GraduationCap, year: "2012— 2015",itle: "B.com", org: "Stanford University", desc: "Graduated with honors. Focus on Human-Computer Interaction." },
  { icon: Award, year: "2012", title: "Google UX Certification", org: "Coursera", desc: "Completed 7-course professional UX design specialization." },
  { icon: BookOpen, year: "2024", title: "Advanced React Patterns", org: "Frontend Masters", desc: "Deep dive into performance, suspense, and concurrent rendering." },
];

export function Education() {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Education</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">My <span className="text-gradient">journey</span></h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full"
            style={{ background: "var(--gradient-primary)" }}
          />
          <div className="space-y-10">
            {items.map((it, i) => (
              <motion.div
                key={it.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative pl-14 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-10 ${
                  i % 2 === 0 ? "" : "sm:flex-row-reverse"
                }`}
              >
                <div className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-2 w-8 h-8 rounded-full grid place-items-center btn-primary`}>
                  <it.icon size={14} />
                </div>
                <div className={i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:col-start-2 sm:pl-10"}>
                  <div className="glass rounded-2xl p-5 hover:-translate-y-1 transition-transform">
                    <span className="text-xs font-semibold text-primary">{it.year}</span>
                    <h3 className="text-lg font-bold mt-1">{it.title}</h3>
                    <div className="text-sm text-muted-foreground">{it.org}</div>
                    <p className="text-sm mt-2 text-foreground/80">{it.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
