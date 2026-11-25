import Link from "next/link";
import Image from "next/image";
import type { SiteSettings } from "@/domain/models";

const explore = [
  ["About CPMI", "/about"], ["Our ministries", "/ministries"], ["News", "/news"], ["Events", "/events"], ["Gallery", "/gallery"],
];
const media = [
  ["Live", "/live"], ["Radio", "/radio"], ["Sermons", "/sermons"], ["Podcasts", "/podcasts"], ["Devotionals", "/devotionals"],
];
const participate = [
  ["Plan your visit", "/plan-your-visit"], ["Request prayer", "/prayer"], ["Give", "/give"], ["Get involved", "/get-involved"], ["Contact", "/contact"],
];

function FooterLinks({ heading, links }: { heading: string; links: string[][] }) {
  return <div className="single-footer-widget"><div className="widget-head"><h4 className="text-white">{heading}</h4></div><ul className="list-area">{links.map(([label, href]) => <li key={href}><Link href={href!}><i className="far fa-chevron-double-right" aria-hidden="true" />{label}</Link></li>)}</ul></div>;
}

export default function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer-section footer-bg cpmi-footer">
      <div className="container"><div className="footer-widgets-wrapper"><div className="row g-5">
        <div className="col-xl-4 col-md-6"><div className="single-footer-widget"><div className="widget-head"><Link href="/" className="cpmi-wordmark is-inverse"><span className="cpmi-monogram cpmi-image-mark"><Image src="/assets/img/brand/cpmi/cpmi-mark.svg" alt="" width={46} height={46} /></span><span className="cpmi-wordmark-copy">Christian Power<br />Ministries International</span></Link></div><div className="footer-content"><p>{settings.declaration ?? settings.vision}</p><div className="footer-scripture"><span>Our invitation</span><strong>{settings.scriptureReference}</strong></div></div></div></div>
        <div className="col-xl-2 col-md-6"><FooterLinks heading="Explore" links={explore} /></div>
        <div className="col-xl-2 col-md-6"><FooterLinks heading="Media" links={media} /></div>
        <div className="col-xl-2 col-md-6"><FooterLinks heading="Participate" links={participate} /></div>
        <div className="col-xl-2 col-md-6"><div className="single-footer-widget"><div className="widget-head"><h4 className="text-white">Contact</h4></div><div className="footer-content contact-info-area">
          {settings.publicEmail ? <a href={`mailto:${settings.publicEmail}`}><i className="fal fa-envelope" aria-hidden="true" />{settings.publicEmail}</a> : <Link href="/contact"><i className="fal fa-envelope" aria-hidden="true" />Send a message</Link>}
          {settings.publicPhone ? <a href={`tel:${settings.publicPhone}`}><i className="fal fa-phone" aria-hidden="true" />{settings.publicPhone}</a> : <Link href="/prayer"><i className="fal fa-hands-praying" aria-hidden="true" />Request prayer</Link>}
          <p><i className="fal fa-map-marker-alt" aria-hidden="true" />{settings.address ?? settings.foundedIn ?? "Johannesburg, South Africa"}</p>
        </div></div></div>
      </div></div></div>
      <div className="footer-bottom"><div className="container"><div className="footer-wrapper cpmi-footer-bottom"><p>© {new Date().getFullYear()} Christian Power Ministries International.</p><div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/admin">Administration</Link></div></div></div></div>
    </footer>
  );
}
