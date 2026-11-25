import type { Metadata } from "next";
import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = { title: "Gallery", alternates: { canonical: "/gallery" } };
export default async function GalleryPage() { const { gallery } = await getPublicContent(); return <><PageBanner pageName="Gallery" pageTitle="Worship, community and service" /><section className="gallery-section section-padding cpmi-gallery-page"><div className="container"><SectionHeading eyebrow="Ministry moments" title="A visual record of faith in action" intro="Bundled template imagery is temporary until approved CPMI photography is supplied." /><div className="gallery-masonry">{gallery.map((item, index) => <figure key={item.id} className={index % 3 === 0 ? "gallery-tall" : ""}><a href={item.image.src} className="img-popup"><Image src={item.image.src} alt={item.image.alt} width={760} height={index % 3 === 0 ? 920 : 620} sizes="(max-width: 767px) 100vw, 33vw" /></a><figcaption><h3>{item.title}</h3></figcaption></figure>)}</div></div></section></>; }
