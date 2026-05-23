export function FloatingBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="floating-blur animate-[float_8s_ease-in-out_infinite]"
        style={{ width: 420, height: 420, top: -80, left: -80, background: "oklch(0.78 0.18 150)" }}
      />
      <div
        className="floating-blur animate-[float_10s_ease-in-out_infinite_reverse]"
        style={{ width: 360, height: 360, top: "30%", right: -120, background: "oklch(0.85 0.14 155)" }}
      />
      <div
        className="floating-blur animate-[float_12s_ease-in-out_infinite]"
        style={{ width: 480, height: 480, bottom: -160, left: "30%", background: "oklch(0.7 0.18 160)" }}
      />
    </div>
  );
}
