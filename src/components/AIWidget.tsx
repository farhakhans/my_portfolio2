import { useState, useRef, useEffect } from "react";

const knowledge = [
  { keywords: ["home", "welcome", "landing"], answer: "The Home section introduces the developer and highlights availability and key roles like Frontend Developer and UI/UX Designer." },
  { keywords: ["about", "bio", "background"], answer: "The About section summarizes experience, domains worked in, and design/dev approach used on projects." },
  { keywords: ["skills", "tech", "technologies"], answer: "Skills include React, TypeScript, Tailwind CSS, animation, accessibility, and AI integrations for production web apps." },
  { keywords: ["projects", "work", "portfolio"], answer: "Projects lists featured work with descriptions, tech stacks, code links, and live demos. Use the project cards to view code or demo links." },
  { keywords: ["ai", "agent", "assistant"], answer: "The AI Assistant answers questions about the portfolio, projects, skills, contact info, and resume. Use the widget to ask quick questions." },
  { keywords: ["education", "school", "degree"], answer: "The Education section shows formal training and relevant courses that support the developer's skills and expertise." },
  { keywords: ["testimonials", "reviews", "clients"], answer: "Testimonials contains short endorsements from clients and colleagues that highlight delivery, collaboration, and product impact." },
  { keywords: ["contact", "email", "hire"], answer: "Contact via the Contact section at the bottom or by using the listed email address for hiring and inquiries." },
  { keywords: ["resume", "cv"], answer: "Resume controls live in the Hero section and allow visitors to download or upload a CV directly from the page." },
];

function getAnswer(q: string) {
  const normalized = q.trim().toLowerCase();
  if (!normalized) return "Ask me something about this portfolio.";
  const partial = knowledge.find((k) => k.keywords.some((kw) => normalized.includes(kw)));
  return partial?.answer ?? "I can answer portfolio-related questions about projects, skills, contact, and resume.";
}

export function AIWidget() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi — ask me about the portfolio." },
  ]);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    const assistantText = getAnswer(t);
    setMessages((m) => [...m, { role: "user", text: t }, { role: "assistant", text: assistantText }]);
    setInput("");

    // show toast preview of assistant reply and auto-hide
    setToast(assistantText);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 5000);
  };

  const latestAssistant = (() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].text;
    }
    return "";
  })();

  return (
    <div className="fixed z-50 right-6 bottom-6">
      {/* Floating toast shown when assistant replies so users don't need to scroll */}
      {toast && (
        <div className="fixed right-6 bottom-28 z-50 w-80 lg:w-96 pointer-events-auto">
          <div className="bg-white dark:bg-slate-800 border border-border rounded-2xl shadow-lg p-3 text-sm" role="status" aria-live="polite">
            <div className="text-foreground/90">{toast}</div>
          </div>
        </div>
      )}
      {open ? (
        <div className="w-80 lg:w-96 bg-white dark:bg-slate-900 border border-border rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary/70 text-white">
            <div className="text-sm font-semibold">AI Assistant</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setOpen(false)} className="text-sm opacity-90">Hide</button>
            </div>
          </div>

            {/* Latest assistant preview so answers are visible without scrolling */}
            <div className="px-4 py-3 border-b border-border text-sm text-foreground/90 min-h-[4rem] overflow-hidden">
              {latestAssistant || "Ask me anything about the portfolio."}
            </div>

            <div className="p-3">
            <div className="max-h-40 overflow-y-auto space-y-2 mb-3 text-sm">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-xl ${m.role === 'user' ? 'ml-auto bg-slate-100 text-slate-900' : 'bg-slate-900 text-white'}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about the portfolio..."
                className="flex-1 rounded-xl border border-border px-3 py-2 text-sm outline-none bg-background/80"
              />
              <button onClick={send} className="btn-primary px-3 py-2 rounded-xl text-sm">Ask</button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Assistant"
          className="w-12 h-12 rounded-full bg-primary text-white grid place-items-center shadow-lg"
        >
          AI
        </button>
      )}
    </div>
  );
}
