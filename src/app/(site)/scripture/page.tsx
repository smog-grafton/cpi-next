import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import EmptyState from "@/components/site/EmptyState";
import SectionHeading from "@/components/site/SectionHeading";
import { getPublicContent } from "@/server/repositories/content-repository";

export const metadata: Metadata = {
  title: "Scripture",
  description: "Scripture references connected with CPMI devotionals and teachings.",
  alternates: { canonical: "/scripture" },
};

export default async function ScripturePage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const { reference = "" } = await searchParams;
  const query = reference.trim().toLocaleLowerCase();
  const content = await getPublicContent();
  const references = [
    ...new Set(
      content.devotionals
        .flatMap((item) => item.scriptureReferences)
        .concat(content.sermons.flatMap((item) => item.scriptureReferences)),
    ),
  ];
  const filtered = query
    ? references.filter((item) => item.toLocaleLowerCase().includes(query))
    : references;

  return (
    <>
      <PageBanner
        pageName="Scripture"
        pageTitle="Follow Scripture through teaching and devotion"
      />
      <section className="section-padding scripture-page">
        <div className="container">
          <SectionHeading
            eyebrow="Reference index"
            title="Search configured Scripture references"
            intro="Full Bible text appears only when a licensed translation or provider is configured. This page currently indexes references, related devotionals and teachings."
          />
          <form className="scripture-search" action="/scripture">
            <label htmlFor="scripture-reference">Passage or reference</label>
            <div>
              <input
                id="scripture-reference"
                name="reference"
                defaultValue={reference}
                placeholder="For example: Matthew 11:28"
              />
              <button className="theme-btn" type="submit">Find references</button>
            </div>
          </form>
          {filtered.length ? (
            <div className="reference-grid">
              {filtered.map((item) => {
                const devotionalLinks = content.devotionals.filter((entry) =>
                  entry.scriptureReferences.includes(item),
                );
                const sermonLinks = content.sermons.filter((entry) =>
                  entry.scriptureReferences.includes(item),
                );
                return (
                  <article key={item}>
                    <span>Scripture reference</span>
                    <h3>{item}</h3>
                    {devotionalLinks.map((entry) => (
                      <Link href={`/devotionals/${entry.slug}`} key={entry.slug}>
                        Devotional: {entry.title}
                      </Link>
                    ))}
                    {sermonLinks.map((entry) => (
                      <Link href={`/sermons/${entry.slug}`} key={entry.slug}>
                        Teaching: {entry.title}
                      </Link>
                    ))}
                  </article>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="far fa-book-bible"
              title="No matching reference is configured"
              message="Try another passage. The platform does not invent translation text or call an unconfigured provider."
            />
          )}
        </div>
      </section>
    </>
  );
}
