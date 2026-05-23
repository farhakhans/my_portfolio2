import { useEffect, useState } from "react";

export function Typewriter({ words, className = "" }: { words: string[]; className?: string }) {
  const [idx, setIdx] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    if (!deleting && sub === current.length) {
      const t = setTimeout(() => setDeleting(true), 1500);
      return () => clearTimeout(t);
    }
    if (deleting && sub === 0) {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(() => setSub((s) => s + (deleting ? -1 : 1)), deleting ? 40 : 80);
    return () => clearTimeout(t);
  }, [sub, deleting, idx, words]);

  const current = words[idx % words.length].slice(0, sub);
  return (
    <span className={className}>
      {current}
      <span className="inline-block w-[3px] h-[1em] ml-1 align-[-0.15em] bg-primary animate-blink" />
    </span>
  );
}
