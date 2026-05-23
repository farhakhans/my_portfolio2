import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useRef, useState } from "react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";

const projects = [
  {
    img: p1,
    title: "Analytics Dashboard",
    desc: "A real-time SaaS dashboard with charts, filters, and team collaboration.",
    tech: ["React", "TypeScript", "Tailwind", "Recharts"],
    codeUrl: "https://github.com/farhanakhan/analytics-dashboard",
    liveUrl: "https://github.com/farhanakhan/analytics-dashboard",
  },
  {
    img: p2,
    title: "Mint Commerce",
    desc: "A lightning-fast mobile-first e-commerce experience with smooth checkout.",
    tech: ["Next.js", "Stripe", "Framer Motion"],
    codeUrl: "https://github.com/farhanakhan/mint-commerce",
    liveUrl: "https://github.com/farhanakhan/mint-commerce",
  },
  {
    img: p3,
    title: "AI Assistant",
    desc: "Conversational AI interface powered by streaming LLM responses.",
    tech: ["React", "OpenAI", "Edge Functions"],
    codeUrl: "https://github.com/farhanakhan/ai-assistant",
    liveUrl: "https://github.com/farhanakhan/ai-assistant",
  },
];

export function Projects() {
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});
  const [videos, setVideos] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<Record<string, string>>({});
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const triggerPicker = (key: string) => {
    inputRefs.current[key]?.click();
  };

  const handleFile = async (key: string, file?: File | null) => {
    if (!file) return;
    // preview the selected file immediately while uploading to the server
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((s) => ({ ...s, [key]: previewUrl }));
    setVideos((s) => ({ ...s, [key]: previewUrl }));

    try {
      const safeName = `${key.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}-${file.name}`;
      const buf = await file.arrayBuffer();
      const res = await fetch("/api/upload-video", { method: "POST", headers: { "content-type": file.type || "application/octet-stream", "x-filename": safeName }, body: buf });
      if (res.ok) {
        const body = await res.json();
        if (body?.ok && body?.url) {
          const head = await fetch(body.url, { method: "HEAD" });
          if (head.ok) {
            setVideos((s) => ({ ...s, [key]: body.url }));
          }
          // show success message briefly
          setMessages((m) => ({ ...m, [key]: "Upload successful" }));
          setTimeout(() => setMessages((m) => { const c = { ...m }; delete c[key]; return c; }), 3000);
        } else {
          console.error("Unexpected upload response", body);
          setMessages((m) => ({ ...m, [key]: "Upload failed" }));
          setTimeout(() => setMessages((m) => { const c = { ...m }; delete c[key]; return c; }), 3000);
        }
      } else {
        const err = await res.text();
        console.error("Upload failed", err);
        setMessages((m) => ({ ...m, [key]: "Upload failed" }));
        setTimeout(() => setMessages((m) => { const c = { ...m }; delete c[key]; return c; }), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeVideo = (key: string) => {
    const url = videos[key];
    if (url?.startsWith("blob:")) URL.revokeObjectURL(url);
    setVideos((s) => {
      const copy = { ...s };
      delete copy[key];
      return copy;
    });
  };

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Work</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">
            Featured <span className="text-gradient">projects</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-3xl overflow-hidden group hover:-translate-y-2 hover:shadow-[var(--shadow-glow)] transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {videos[p.title] ? (
                  <video
                    src={videos[p.title]}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1024}
                    height={640}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t) => (
                    <span key={t} className="text-xs font-medium px-2.5 py-1 rounded-full bg-accent text-accent-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 mt-5">
                  <a
                    href={p.codeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 btn-secondary px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-1.5 ${!p.codeUrl ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <Github size={14} /> Code
                  </a>
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 btn-primary px-3 py-2 rounded-xl text-sm font-semibold inline-flex items-center justify-center gap-1.5 ${!p.liveUrl ? "opacity-60 pointer-events-none" : ""}`}
                  >
                    <ExternalLink size={14} /> Live
                  </a>
                </div>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex gap-2 items-center">
                    <button onClick={() => triggerPicker(p.title)} className="btn-secondary px-3 py-2 rounded-xl text-sm font-semibold">
                      Upload Video
                    </button>
                    {videos[p.title] && (
                      <button onClick={() => removeVideo(p.title)} className="btn-primary px-3 py-2 rounded-xl text-sm font-semibold">
                        Remove Video
                      </button>
                    )}
                    <input
                      ref={(el) => (inputRefs.current[p.title] = el)}
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => handleFile(p.title, e.target.files?.[0] ?? null)}
                    />
                  </div>
                  {messages[p.title] && (
                    <div className="text-sm text-foreground/80">{messages[p.title]}</div>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
