"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useStickyHeader } from "@/utility";

interface NavItem {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string }>;
}

const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our story", href: "/about" },
      { label: "Vision & mission", href: "/about/vision-mission" },
      { label: "Leadership", href: "/about/leadership" },
    ],
  },
  {
    label: "Media",
    href: "/live",
    children: [
      { label: "Live", href: "/live" },
      { label: "Radio", href: "/radio" },
      { label: "Radio schedule", href: "/radio/schedule" },
      { label: "Watch", href: "/watch" },
      { label: "Sermons", href: "/sermons" },
      { label: "Podcasts", href: "/podcasts" },
    ],
  },
  {
    label: "Connect",
    href: "/ministries",
    children: [
      { label: "Ministries", href: "/ministries" },
      { label: "Events", href: "/events" },
      { label: "News", href: "/news" },
      { label: "Devotionals", href: "/devotionals" },
      { label: "Prayer", href: "/prayer" },
      { label: "Get involved", href: "/get-involved" },
    ],
  },
  { label: "Give", href: "/give" },
];

function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className={`cpmi-wordmark${inverse ? " is-inverse" : ""}`} aria-label="Christian Power Ministries International home">
      <span className="cpmi-monogram cpmi-image-mark"><Image src="/assets/img/brand/cpmi/cpmi-mark.svg" alt="" width={46} height={46} priority /></span>
      <span className="cpmi-wordmark-copy">Christian Power<br />Ministries International</span>
    </Link>
  );
}

function DesktopNavigation({ pathname }: { pathname: string }) {
  return (
    <div className="main-menu d-none d-xl-block">
      <nav aria-label="Primary navigation">
        <ul>
          {navigation.map((item) => {
            const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <li className={item.children ? "has-dropdown" : undefined} key={item.href}>
                <Link href={item.href} aria-current={current ? "page" : undefined}>
                  {item.label}{item.children && <i className="fas fa-angle-down" aria-hidden="true" />}
                </Link>
                {item.children && (
                  <ul className="submenu">
                    {item.children.map((child) => <li key={child.href}><Link href={child.href}>{child.label}</Link></li>)}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function MobileNavigation({ pathname, close }: { pathname: string; close: () => void }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <nav className="cpmi-mobile-nav" aria-label="Mobile navigation">
      <ul>
        {navigation.map((item) => {
          const open = active === item.href;
          const current = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <div className="mobile-nav-row">
                <Link href={item.href} onClick={close} aria-current={current ? "page" : undefined}>{item.label}</Link>
                {item.children && (
                  <button type="button" onClick={() => setActive(open ? null : item.href)} aria-expanded={open} aria-label={`${open ? "Close" : "Open"} ${item.label} menu`}>
                    <i className={open ? "far fa-minus" : "far fa-plus"} aria-hidden="true" />
                  </button>
                )}
              </div>
              {item.children && open && <ul>{item.children.map((child) => <li key={child.href}><Link href={child.href} onClick={close}>{child.label}</Link></li>)}</ul>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default function SiteHeader({ publicEmail, publicPhone, topbarText }: { publicEmail?: string; publicPhone?: string; topbarText?: string }) {
  useStickyHeader();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);
  function submitSearch(event: FormEvent) {
    event.preventDefault();
    if (query.trim().length > 1) {
      setSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <>
      <header className="header-section-2 cpmi-header">
        <div className="header-top-section-2">
          <div className="container"><div className="header-top-wrapper-2">
            <p className="topbar-statement"><i className="far fa-book-open" aria-hidden="true" /> {topbarText ?? "Learn the Kingdom tools"}</p>
            <div className="topbar-links">
              {publicPhone && <a href={`tel:${publicPhone}`}><i className="far fa-phone" aria-hidden="true" /> {publicPhone}</a>}
              {publicEmail && <a href={`mailto:${publicEmail}`}><i className="far fa-envelope" aria-hidden="true" /> {publicEmail}</a>}
              <Link href="/radio"><i className="far fa-waveform" aria-hidden="true" /> Listen</Link>
            </div>
          </div></div>
        </div>
        <div id="header-sticky" className="header-2">
          <div className="container"><div className="mega-menu-wrapper"><div className="header-main style-2">
            <div className="header-left"><div className="logo"><Brand /></div></div>
            <div className="header-right d-flex justify-content-end align-items-center">
              <DesktopNavigation pathname={pathname} />
              <button type="button" className="search-trigger search-icon" onClick={() => setSearchOpen(true)} aria-label="Search CPMI"><i className="fa-light fa-magnifying-glass" aria-hidden="true" /></button>
              <div className="header-button"><Link href="/plan-your-visit" className="theme-btn">Plan a visit <i className="far fa-arrow-right" aria-hidden="true" /></Link></div>
              <div className="header__hamburger d-xl-none my-auto"><button type="button" className="sidebar__toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><i className="fas fa-bars" aria-hidden="true" /></button></div>
            </div>
          </div></div></div>
        </div>
      </header>

      <div className={`offcanvas__info cpmi-offcanvas${mobileOpen ? " info-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="offcanvas__wrapper"><div className="offcanvas__content">
          <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center"><Brand /><button type="button" className="offcanvas__close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><i className="fas fa-times" /></button></div>
          <p className="mobile-intro">Discover your purpose, grow in faith and find meaningful ways to serve.</p>
          <MobileNavigation pathname={pathname} close={() => setMobileOpen(false)} />
          <div className="mobile-quick-actions"><Link href="/plan-your-visit" className="theme-btn">Plan your visit</Link><Link href="/live" className="theme-btn transparent-btn">Watch & listen</Link></div>
        </div></div>
      </div>
      <button type="button" className={`offcanvas__overlay cpmi-overlay${mobileOpen ? " overlay-open" : ""}`} onClick={() => setMobileOpen(false)} aria-label="Close navigation overlay" />

      <div className="search-wrap cpmi-search" style={{ display: searchOpen ? "block" : "none" }} aria-hidden={!searchOpen}>
        <button type="button" className="search-close" onClick={() => setSearchOpen(false)} aria-label="Close search"><i className="fa-light fa-xmark" /></button>
        <div className="search-inner"><div className="search-cell"><form onSubmit={submitSearch}><label htmlFor="site-search">Search sermons, ministries, news and more</label><div className="search-field-holder"><input id="site-search" type="search" className="main-search-input" placeholder="What are you looking for?" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus={searchOpen} /></div></form></div></div>
      </div>
    </>
  );
}
