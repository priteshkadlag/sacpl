import { Button } from '@/components/ui/Button';
import { DimensionLine } from '@/components/ui/Annotation';
import { BrandPeak } from '@/components/brand/BrandPeak';
import { startProjectHref } from '@/content/navigation';

export function CtaBand({
  title = 'Build Your Vision with SACPL.',
  text = 'Partner with SACPL for structural engineering that is innovative, reliable and sustainable — from concept to completion.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden border-t border-white/10 bg-navy text-white">
      <div aria-hidden className="bg-blueprint-navy absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_85%_10%,rgb(143_162_230/0.35),transparent_55%)]" />
      {/* the logo's peak, drawn at architectural scale */}
      <BrandPeak variant="outline" className="pointer-events-none absolute -right-16 -bottom-10 -z-10 w-[min(70vw,40rem)] text-white/15 lg:right-[4%]" />
      <div className="container-x py-24 lg:py-36">
        <DimensionLine label="Start here" tone="light" className="mb-14 max-w-xs" />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 id="cta-title" className="font-display text-display-lg font-semibold lg:col-span-7">
            {title}
          </h2>
          <div className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-white/80">{text}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={startProjectHref} variant="light">
                Start a Project
              </Button>
              <Button href="/contact" variant="ghost-light">
                Contact an Engineer
              </Button>
              <Button href="/careers" variant="ghost-light">
                Explore Careers
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
