import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { InteractivePreview } from "@/components/interactive-preview";
import { FeaturesOverview } from "@/components/features-overview";
import { EditionCompare } from "@/components/edition-compare";
import { BentoArchitecture } from "@/components/bento-architecture";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <InteractivePreview />
        <FeaturesOverview />
        <EditionCompare />
        <BentoArchitecture />
      </main>
      <Footer />
    </div>
  );
}
