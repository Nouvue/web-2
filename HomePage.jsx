import React from "react";
import { useSeo } from "../seo";
import { HeroHome } from "../components/Hero";
import {
  ValueSection,
  ServicesSection,
  NoJudgementSection,
  NouvueFinishSection,
  HomeClubSection,
  ResultsSection,
  ProcessSection,
  TrustSection,
  PropertyIntroSection,
  FAQSection,
  ClosingCTA,
} from "../components/Sections";
import { PROCESS_HOME } from "../data";
import { SERVICE_AREA, RECURRING_RATE_FROM } from "../config";

function HomePage({ openEnquiry }) {
  useSeo({
    title: "Nouvue | Home Cleaning & Housekeeping | Stevenage & Hertfordshire",
    description: `Thoughtful home cleaning, housekeeping and property care serving ${SERVICE_AREA}. Recurring care from £${RECURRING_RATE_FROM} per cleaner-hour. Request a tailored quote.`,
    structuredData: true,
    path: "/",
  });

  return (
    <>
      <HeroHome openEnquiry={openEnquiry} />
      <ValueSection />
      <ServicesSection openEnquiry={openEnquiry} />
      <NoJudgementSection />
      <NouvueFinishSection />
      <HomeClubSection openEnquiry={openEnquiry} />
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
