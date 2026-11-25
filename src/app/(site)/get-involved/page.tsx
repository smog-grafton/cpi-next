import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import SectionHeading from "@/components/site/SectionHeading";

export const metadata: Metadata = { title: "Get involved", alternates: { canonical: "/get-involved" } };
const pathways = [
  { icon: "far fa-graduation-cap", title: "Teach and mentor", text: "Support tutoring, computer skills, music training or leadership development.", href: "/ministries/children-youth-and-education" },
  { icon: "far fa-hands-helping", title: "Serve with compassion", text: "Join prayer, hospital visitation, counselling and practical community care.", href: "/ministries/healing-and-compassionate-care" },
  { icon: "far fa-calendar-heart", title: "Attend a gathering", text: "Join the Sunday Kingdom Citizens Celebration or plan a first visit.", href: "/plan-your-visit" },
  { icon: "far fa-heart", title: "Support the mission", text: "Contribute skills, equipment, learning materials, food, clothing or financial support.", href: "/give" },
];
const practicalNeeds = ["Teachers and mentors", "Computers and projectors", "Musical instruments", "Bibles and books", "Clothing and blankets", "Food and household essentials"];

export default function InvolvedPage() {
  return <><PageBanner pageName="Get involved" pageTitle="Bring what you have. Help someone discover what they carry." />
    <section className="section-padding"><div className="container"><div className="row g-5 align-items-center">
      <div className="col-lg-6"><Image src="/assets/img/brand/cpmi/cpmi-community-outreach.png" alt="Community members learning, gardening and serving together" width={1672} height={941} /></div>
      <div className="col-lg-6"><SectionHeading eyebrow="Take a next step" title="There is room to learn, serve and belong" align="start" /><p>CPMI welcomes people who can teach, mentor, pray, serve or provide practical resources. Every contribution should strengthen dignity, learning and long-term community development.</p><Link href="/contact" className="theme-btn">Ask how to participate</Link></div>
    </div><div className="participation-grid">{pathways.map((pathway) => <article key={pathway.title}><i className={pathway.icon} /><h3>{pathway.title}</h3><p>{pathway.text}</p><Link href={pathway.href}>Explore <i className="far fa-arrow-right" /></Link></article>)}</div></div></section>
    <section className="section-padding section-bg"><div className="container"><SectionHeading eyebrow="Practical support" title="Resources that can strengthen the work" intro="Contact the ministry before delivering goods so the team can confirm the current need and handover arrangements." /><div className="values-strip involvement-needs">{practicalNeeds.map((need) => <span key={need}>{need}</span>)}</div><div className="section-action text-center"><Link href="/contact" className="theme-btn transparent-btn-2">Coordinate a contribution</Link></div></div></section>
  </>;
}
