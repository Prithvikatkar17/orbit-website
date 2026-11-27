import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ScreenshotGallery } from "@/components/screenshot-gallery";
import { InteractivePreview } from "@/components/interactive-preview";
import { FeaturesOverview } from "@/components/features-overview";
import { BentoArchitecture } from "@/components/bento-architecture";
import { EditionCompare } from "@/components/edition-compare";
import { FinalCta } from "@/components/final-cta";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ScreenshotGallery />
        <InteractivePreview />
        <FeaturesOverview />
        <BentoArchitecture />
        <EditionCompare />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
