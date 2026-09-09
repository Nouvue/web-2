import React from "react";
import { useSeo } from "../seo";
import { HeroHome } from "../components/Hero";
import {
  ValueSection,
  ServicesSection,
  NoJudgementSection,
  NouvueFinishSection,
  ResultsSection,
  ProcessSection,
  TrustSection,
  PropertyIntroSection,
  FAQSection,
  ClosingCTA,
} from "../components/Sections";
import { PROCESS_HOME } from "../data";

function HomePage({ openEnquiry }) {
  useSeo({
    title: "Nouvue | Home Cleaning & Housekeeping | Uxbridge & West London",
    description:
      "Thoughtful home cleaning, housekeeping and property care from our Uxbridge base, serving selected areas across West London and South Buckinghamshire. Request a tailored quote.",
    structuredData: true,
  });

  return (
    <>
      <HeroHome openEnquiry={openEnquiry} />
      <ValueSection />
      <ServicesSection openEnquiry={openEnquiry} />
      <NoJudgementSection />
      <NouvueFinishSection />
      <ResultsSection openEnquiry={openEnquiry} />
      <ProcessSection steps={PROCESS_HOME} title="How it works" />
      <TrustSection page="home" />
      <PropertyIntroSection openEnquiry={openEnquiry} />
      <FAQSection page="home" />
      <ClosingCTA page="home" openEnquiry={openEnquiry} />
    </>
  );
}

export default HomePage;
