import { FormEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  text: string;
};

const knowledge = [
  {
    keywords: ["projects"],
    answer:
      "This portfolio highlights modern web work built with React, TypeScript, Tailwind CSS, and AI-powered experiences. You can explore project cards for code and live demos.",
  },
  {
    keywords: ["skills", "technology", "tech"],
    answer:
      "The main skill set shown here includes frontend development, UI/UX design, responsive layouts, animation, and AI integration using modern tools like React and Tailwind CSS.",
  },
  {
    keywords: ["contact", "hire", "email"],
    answer:
      "You can reach out through the contact form at the bottom of the dashboard or by using the email address listed in the contact section.",
  },
  {
    keywords: ["resume", "cv"],
    answer:
      "The portfolio includes a resume control that lets visitors upload and download the latest CV directly from the hero section.",
  },
  {
    keywords: ["availability", "projects"],
    answer:
      "This portfolio owner is available for new projects and prefers building frontend experiences with a strong focus on design, performance, and accessibility.",
  },
  {
    keywords: ["ai", "assistant", "chat"],
    answer:
      "This AI assistant is built into the portfolio to help answer questions about the site, the work, and the skills demonstrated here.",
  },
];

function getAnswer(question: string) {
  const normalized = question.trim().toLowerCase();
  if (!normalized) {
    return "Ask me anything about this portfolio, like the projects, skills, how to contact the owner, or resume details.";
  }

  const exact = knowledge.find((item) =>
    item.keywords.every((keyword) => normalized.includes(keyword))
  );

  if (exact) return exact.answer;

  const partial = knowledge.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  return (
    partial?.answer ??
    "I can answer portfolio-related questions. Try asking about projects, skills, contact information, resume, or how to work with this developer."
  );
}

export function AIChat() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi there! I’m the portfolio assistant. Ask me anything about the projects, skills, contact details, resume, or available work.",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const isNearBottom = container.scrollHeight - (container.scrollTop + container.clientHeight) < 80;
    const last = messages[messages.length - 1];

    // Auto-scroll only when the user is already near the bottom or the user just sent a message.
    if (isNearBottom || last?.role === "user") {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const next: Message[] = [
      ...messages,
      { role: "user", text: trimmed },
      { role: "assistant", text: getAnswer(trimmed) },
    ];

    setMessages(next);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <section id="ai" className="relative py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">AI Assistant</span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3">Ask the portfolio</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get instant answers about the portfolio, the work, the tech stack, and how to contact the designer.
          </p>
        </div>

        <div className="glass rounded-3xl overflow-hidden border border-border shadow-[var(--shadow-soft)]">
          <div className="bg-slate-950 px-6 py-5 text-white border-b border-border">
            <p className="text-sm font-medium">Portfolio AI Assistant</p>
          </div>

          <div className="p-6 space-y-6">
            <div ref={messagesContainerRef} className="max-h-[420px] overflow-y-auto space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`rounded-3xl p-4 max-w-[90%] ${
                    message.role === "user"
                      ? "ml-auto bg-slate-100 text-slate-900"
                      : "bg-slate-900 text-white"
                  }`}
                >
                  <p className="text-sm leading-6 whitespace-pre-wrap">{message.text}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask about the portfolio, projects, or skills..."
                className="min-w-0 flex-1 rounded-3xl border border-border bg-background/80 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
              <button
                type="submit"
                className="btn-primary rounded-3xl px-6 py-3 text-sm font-semibold"
              >
                Ask
              </button>
            </form>

            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {[
                "What are your top skills?",
                "Tell me about the projects.",
                "How can I contact you?",
                "Do you have a resume?",
              ].map((sample) => (
                <button
                  key={sample}
                  type="button"
                  onClick={() => sendMessage(sample)}
                  className="rounded-full border border-border px-3 py-2 text-sm transition hover:border-primary hover:text-primary"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
