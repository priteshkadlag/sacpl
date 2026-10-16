export default function Loading() {
  return (
    <div role="status" aria-live="polite" className="bg-blueprint-dark flex min-h-dvh items-center justify-center bg-ink">
      <div className="w-48">
        <div className="h-px overflow-hidden bg-white/15">
          <div className="h-px w-1/3 bg-signal" style={{ animation: 'loading-bar 1.2s ease-in-out infinite alternate' }} />
        </div>
        <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase">Loading</p>
      </div>
      <style>{`@keyframes loading-bar{from{transform:translateX(0)}to{transform:translateX(200%)}}`}</style>
    </div>
  );
}
