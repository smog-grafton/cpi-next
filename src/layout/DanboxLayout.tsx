"use client";
import ImageView from "@/components/ImageView";
import VideoPopup from "@/components/VideoPopup";
import { useScrollAnimation } from "@/utility";
import { Fragment, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ScrollTop from "./ScrollTop";

const DanboxLayout = ({
  children,
  header = 3,
  footer = 3,
}: {
  children?: ReactNode;
  header?: number;
  footer?: number;
}) => {
  useScrollAnimation();
  return (
    <Fragment>
      <VideoPopup />
      <ImageView />
      <Header header={header} />
      {children}
      <Footer footer={footer} />
      <ScrollTop />
    </Fragment>
  );
};

export default DanboxLayout;
