"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { sliderProps } from "@/utility/sliderProps";

const slides = [
  { image: "/assets/img/brand/cpmi/cpmi-hero-worship.png", eyebrow: "Faith · Purpose · Service", title: "Discover Your Purpose. Grow in Faith. Transform Your World." },
  { image: "/assets/img/hero/hero-4.jpg", eyebrow: "Christian Power Ministries International", title: "A Place to Belong. A Purpose to Fulfil." },
];

export default function HomepageHero({ videoUrl }: { videoUrl?: string }) {
  return <section className="hero-section hero-1 style-hero-2 cpmi-hero"><div className="array-button"><button className="array-prev" aria-label="Previous hero slide"><i className="fas fa-long-arrow-left" /></button><button className="array-next" aria-label="Next hero slide"><i className="fas fa-long-arrow-right" /></button></div><Swiper {...sliderProps.heroSlider2} className="swiper hero-slider"><div className="swiper-wrapper">{slides.map((slide, index) => <SwiperSlide key={slide.image} className="swiper-slide"><div className="hero-image bg-cover" style={{ backgroundImage: `url("${slide.image}")` }}>{index === 0 && videoUrl && <video className="hero-background-video" autoPlay muted loop playsInline poster={slide.image}><source src={videoUrl} /></video>}</div><div className="hero-scrim" /><div className="container"><div className="row"><div className="col-xl-12"><div className="hero-content text-center"><h5 data-animation="fadeInUp" data-delay="1.2s">{slide.eyebrow}</h5><h1 data-animation="fadeInUp" data-delay="1.4s">{slide.title}</h1><div className="hero-button"><Link href="/live" data-animation="fadeInUp" data-delay="1.6s" className="theme-btn"><i className="fas fa-play" aria-hidden="true" /> Watch live</Link><Link href="/plan-your-visit" data-animation="fadeInUp" data-delay="1.6s" className="theme-btn transparent-btn">Plan your visit</Link></div></div></div></div></div></SwiperSlide>)}</div></Swiper><div className="hero-trust-note"><span>{slides.length.toString().padStart(2, "0")}</span><p>Ways to take your next step: worship, learn, listen, serve and give.</p></div></section>;
}
