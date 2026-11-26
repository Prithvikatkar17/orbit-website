import React from "react";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { InteractivePreview } from "@/components/interactive-preview";
import { FeaturesOverview } from "@/components/features-overview";
import { BentoArchitecture } from "@/components/bento-architecture";
import { EditionCompare } from "@/components/edition-compare";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#050508]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <InteractivePreview />
        <FeaturesOverview />
        <BentoArchitecture />
        <EditionCompare />
      </main>
      <Footer />
    </div>
  );
}
