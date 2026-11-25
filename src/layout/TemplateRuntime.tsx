"use client";

import type { ReactNode } from "react";
import ImageView from "@/components/ImageView";
import VideoPopup from "@/components/VideoPopup";
import ScrollTop from "@/layout/ScrollTop";
import { useScrollAnimation } from "@/utility";

export default function TemplateRuntime({ children }: { children: ReactNode }) {
  useScrollAnimation();
  return <><VideoPopup /><ImageView />{children}<ScrollTop /></>;
}
