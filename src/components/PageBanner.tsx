import Link from "next/link";

export interface BreadcrumbItem { label: string; href?: string }

export default function PageBanner({ pageName = "CPMI", pageTitle, eyebrow = "Christian Power Ministries International", breadcrumbs }: { pageName?: string; pageTitle?: string; eyebrow?: string; breadcrumbs?: BreadcrumbItem[] }) {
  const items = breadcrumbs ?? [{ label: "Home", href: "/" }, { label: pageName }];
  return <div className="breadcrumb-wrapper section-padding bg-cover cpmi-breadcrumb" style={{ backgroundImage: 'url("/assets/img/breadcrumb.jpg")' }}><div className="container"><div className="page-heading"><div className="breadcrumb-sub-title"><h5 className="wow fadeInUp">{eyebrow}</h5><h1 className="wow fadeInUp" data-wow-delay=".2s">{pageTitle ?? pageName}</h1></div><ol className="breadcrumb-items wow fadeInUp" data-wow-delay=".35s">{items.map((item, index) => <li key={`${item.label}-${index}`}>{index > 0 && <i className="fal fa-minus" aria-hidden="true" />}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</li>)}</ol></div></div></div>;
}
