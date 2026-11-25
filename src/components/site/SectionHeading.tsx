export default function SectionHeading({ eyebrow, title, intro, align = "center" }: { eyebrow: string; title: string; intro?: string; align?: "center" | "start" }) {
  return <div className={`section-title ${align === "center" ? "text-center" : ""}`}><span className="sub-title color-2 wow fadeInUp"><i className="far fa-sparkles" aria-hidden="true" />{eyebrow}</span><h2 className="mt-char-animation">{title}</h2>{intro && <p className="section-intro wow fadeInUp" data-wow-delay=".2s">{intro}</p>}</div>;
}
