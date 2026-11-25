import type { ReactNode } from "react";
import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import TemplateRuntime from "@/layout/TemplateRuntime";
import { getPublicContent } from "@/server/repositories/content-repository";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { settings } = await getPublicContent();
  return <TemplateRuntime><SiteHeader publicEmail={settings.publicEmail} publicPhone={settings.publicPhone} topbarText="Learn the Kingdom tools · Love, joy, righteousness, peace & justice" /><main id="main-content">{children}</main><SiteFooter settings={settings} /></TemplateRuntime>;
}
