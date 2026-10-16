/**
 * Re-mounts on every navigation. A short CSS-only architectural wipe and
 * content rise — no animation JavaScript on static pages; disabled for
 * reduced-motion users in globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div aria-hidden className="page-wipe" />
      {children}
    </>
  );
}
