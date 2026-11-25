import Link from "next/link";

export default function EmptyState({ icon = "far fa-clock", title, message, action }: { icon?: string; title: string; message: string; action?: { label: string; href: string } }) {
  return <div className="cpmi-empty-state"><div className="empty-state-icon"><i className={icon} aria-hidden="true" /></div><div><h3>{title}</h3><p>{message}</p>{action && <Link href={action.href} className="link-btn">{action.label} <i className="far fa-arrow-right" aria-hidden="true" /></Link>}</div></div>;
}
