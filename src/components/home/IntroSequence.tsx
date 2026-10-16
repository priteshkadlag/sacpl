'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export const introGateScript = `try{var d=document.documentElement;d.dataset.intro=matchMedia('(prefers-reduced-motion: reduce)').matches?'skip':'play';delete d.dataset.introState}catch(e){}`;

/** Homepage-only logo opening. */
export function IntroSequence() {
  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    html.dataset.intro = reduced ? 'skip' : 'play';
    delete html.dataset.introState;
    const done = window.setTimeout(() => {
      html.dataset.introState = 'done';
      html.dataset.intro = 'skip';
    }, 3000);
    return () => {
      window.clearTimeout(done);
      html.dataset.intro = 'skip';
      html.dataset.introState = 'done';
    };
  }, []);

  return (
    <div className="intro-overlay" aria-hidden="true">
      <div className="intro-only-logo">
        <span className="intro-logo-shape intro-logo-shape-navy" />
        <span className="intro-logo-shape intro-logo-shape-red" />
        <span className="intro-logo-shape intro-logo-shape-outline" />
        <div className="intro-only-logo-window">
          <Image src="/brand/sacpl-logo-light.png" alt="" width={917} height={272} priority className="intro-only-logo-image" sizes="(max-width: 640px) 72vw, 420px" />
          <span className="intro-only-logo-sheen" />
        </div>
      </div>
    </div>
  );
}
