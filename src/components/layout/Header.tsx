'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import { loginHref, mainNav, startProjectHref } from '@/content/navigation';
import { contacts } from '@/content/company';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstPath = useRef(pathname);
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    // Enables the CSS route-change wipe only for client-side navigations.
    if (pathname !== firstPath.current) document.documentElement.dataset.navigated = '';
  }, [pathname]);

  const solid = scrolled || mobileOpen;

  return (
    <LazyMotion features={domAnimation} strict>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500',
          solid
            ? 'bg-paper/95 text-ink shadow-[0_1px_0_rgb(13_16_20/0.08)] backdrop-blur-md'
            : 'bg-ink/45 text-white shadow-[0_1px_0_rgb(255_255_255/0.12)] backdrop-blur-sm',
        )}
      >
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" className="relative z-10 shrink-0" aria-label="SACPL — home">
            <Logo tone={solid ? 'dark' : 'light'} priority />
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.children ? (
                  <li key={item.href}>
                    <ExpertiseMenu item={item} active={isActive(pathname, item.href)} open={dropdownOpen} setOpen={setDropdownOpen} />
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex min-h-11 items-center px-3 text-[0.9rem] transition-opacity hover:opacity-100',
                        isActive(pathname, item.href) ? 'opacity-100' : 'opacity-75',
                      )}
                    >
                      {item.label}
                      {isActive(pathname, item.href) && <span aria-hidden className="absolute inset-x-3 bottom-2 h-px bg-signal" />}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={loginHref} className="hidden min-h-11 items-center px-3 text-[0.9rem] opacity-75 transition-opacity hover:opacity-100 lg:inline-flex">
              Client Login
            </Link>
            <Link
              href={startProjectHref}
              className={cn(
                'group hidden min-h-11 items-center gap-2 px-5 text-sm font-medium transition-colors sm:inline-flex',
                solid ? 'bg-ink text-white hover:bg-navy' : 'bg-white text-ink hover:bg-paper',
              )}
            >
              Start a Project
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center xl:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileOpen((o) => !o)}
            >
              {mobileOpen ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </LazyMotion>
  );
}

function ExpertiseMenu({
  item,
  active,
  open,
  setOpen,
}: {
  item: (typeof mainNav)[number];
  active: boolean;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, setOpen]);

  const onMenuKey = (e: React.KeyboardEvent) => {
    const links = Array.from(ref.current?.querySelectorAll<HTMLAnchorElement>('[data-menu-link]') ?? []);
    const i = links.indexOf(document.activeElement as HTMLAnchorElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      links[(i + 1) % links.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      links[(i - 1 + links.length) % links.length]?.focus();
    }
  };

  return (
    <div
      ref={ref}
      className="relative"
      onPointerEnter={(e) => {
        if (e.pointerType !== 'mouse') return;
        clearTimeout(closeTimer.current);
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== 'mouse') return;
        closeTimer.current = setTimeout(() => setOpen(false), 180);
      }}
      onKeyDown={onMenuKey}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          aria-current={active ? 'page' : undefined}
          className={cn('relative inline-flex min-h-11 items-center pl-3 text-[0.9rem] transition-opacity hover:opacity-100', active ? 'opacity-100' : 'opacity-75')}
        >
          {item.label}
          {active && <span aria-hidden className="absolute inset-x-3 right-0 bottom-2 h-px bg-signal" />}
        </Link>
        <button
          ref={buttonRef}
          type="button"
          aria-expanded={open}
          aria-controls={id}
          aria-label={`${item.label} submenu`}
          onClick={() => setOpen(!open)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
              requestAnimationFrame(() => ref.current?.querySelector<HTMLAnchorElement>('[data-menu-link]')?.focus());
            }
          }}
          className="inline-flex size-11 items-center justify-center opacity-75 hover:opacity-100"
        >
          <ChevronDown aria-hidden className={cn('size-4 transition-transform duration-300', open && 'rotate-180')} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <m.div
            id={id}
            initial={{ opacity: 0, y: -6, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full left-1/2 w-[min(46rem,90vw)] -translate-x-1/2 border border-ink/10 bg-paper text-ink shadow-[0_24px_60px_-20px_rgb(13_16_20/0.35)]"
          >
            <div className="grid grid-cols-2 gap-px bg-ink/8 p-px">
              {item.children!.map((c, i) => (
                <Link
                  key={c.href}
                  href={c.href}
                  data-menu-link
                  className="group block bg-paper p-5 transition-colors hover:bg-white focus-visible:bg-white"
                >
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="mt-1 block font-display text-[0.95rem] font-semibold">{c.label}</span>
                  <span className="mt-1 line-clamp-2 block text-[0.8rem] leading-snug text-steel">{c.description}</span>
                </Link>
              ))}
            </div>
            <Link href={item.href} data-menu-link className="flex items-center justify-between border-t border-ink/10 px-5 py-3 text-sm font-medium hover:bg-white">
              All expertise
              <ArrowRight aria-hidden className="size-4" />
            </Link>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [expertiseOpen, setExpertiseOpen] = useState(false);

  const trap = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', trap);
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus());
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', trap);
    };
  }, [open, trap]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduce ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduce ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
          className="bg-blueprint fixed inset-0 z-40 overflow-y-auto bg-paper pt-[var(--header-h)] xl:hidden"
        >
          <nav aria-label="Mobile" className="container-x pt-6 pb-12">
            <ul className="border-t border-ink/10">
              {mainNav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.04, duration: 0.4 }}
                  className="border-b border-ink/10"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                      className="flex min-h-14 flex-1 items-baseline gap-4 py-3 font-display text-2xl font-semibold"
                    >
                      <span className="font-mono text-xs font-normal text-accent">{String(i + 1).padStart(2, '0')}</span>
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        type="button"
                        aria-expanded={expertiseOpen}
                        aria-controls="mobile-expertise"
                        aria-label="Show expertise areas"
                        onClick={() => setExpertiseOpen((o) => !o)}
                        className="inline-flex size-12 items-center justify-center"
                      >
                        <ChevronDown aria-hidden className={cn('size-5 transition-transform', expertiseOpen && 'rotate-180')} />
                      </button>
                    )}
                  </div>
                  {item.children && expertiseOpen && (
                    <ul id="mobile-expertise" className="pb-4 pl-9">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} className="flex min-h-11 items-center text-[0.95rem] text-graphite">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </m.li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={startProjectHref} className="inline-flex min-h-12 items-center justify-center gap-2 bg-ink px-6 text-sm font-medium text-white">
                Start a Project <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link href={loginHref} className="inline-flex min-h-12 items-center justify-center px-6 text-sm font-medium ring-1 ring-ink/20">
                Client Login
              </Link>
            </div>
            <p className="mt-10 font-mono text-xs tracking-wider text-steel uppercase">Business enquiries</p>
            <p className="mt-2 text-sm">
              <a href={contacts.primaryPhone.href} className="link-line">{contacts.primaryPhone.display}</a>
              <br />
              <a href={`mailto:${contacts.businessEmails[0]}`} className="link-line">{contacts.businessEmails[0]}</a>
            </p>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
