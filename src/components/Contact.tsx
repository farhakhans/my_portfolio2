import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    setSent(true);
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setSent(false), 3500);
  };

  const info = [
    { Icon: Mail, label: "Email", value: "farhanakhanzai14@gmail.com"},
    { Icon: Phone, label: "Phone", value: "+92(55) 123-4567" },
    { Icon: MapPin, label: "Location", value: "Karachi, pakistan" },
  ];

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">Contact</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-2">Let's <span className="text-gradient">work together</span></h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            {info.map((it) => (
              <div key={it.label} className="glass rounded-2xl p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 rounded-xl btn-primary grid place-items-center">
                  <it.Icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{it.label}</div>
                  <div className="font-semibold">{it.value}</div>
                </div>
              </div>
            ))}
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold mb-3">Follow me</div>
              <div className="flex gap-2">
                {[Github, Linkedin, Twitter].map((Icon, k) => (
                  <a key={k} href="#" className="w-10 h-10 grid place-items-center rounded-xl glass hover:text-primary hover:scale-110 transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-strong rounded-3xl p-6 sm:p-8 space-y-4"
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Name" name="name" placeholder="Jane Doe" />
              <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="Project inquiry" />
            <div>
              <label className="text-sm font-medium block mb-1.5">Message</label>
              <textarea
                name="message"
                required
                maxLength={1000}
                rows={5}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending || sent}
              className="btn-primary w-full py-3.5 rounded-xl font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {sent ? (<><Check size={16} /> Message sent!</>) : sending ? "Sending..." : (<><Send size={16} /> Send Message</>)}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required
        maxLength={150}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
      />
    </div>
  );
}
