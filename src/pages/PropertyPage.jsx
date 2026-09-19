import React from "react";
import { useSeo } from "../seo";
import { HeroProperty } from "../components/Hero";
import {
  PropertyIntroSection,
  ProcessSection,
  TrustSection,
  FAQSection,
  ClosingCTA,
} from "../components/Sections";
import { PROCESS_PROPERTY } from "../data";
import { SERVICE_AREA } from "../config";

function PropertyPage({ openEnquiry }) {
  useSeo({
    title: "Property Care & Preparation | Stevenage & Hertfordshire | Nouvue",
    description: `Moving and property preparation across ${SERVICE_AREA} — for landlords, letting agents and property professionals.`,
    structuredData: false,
    path: "/property",
  });

  return (
    <>
      <HeroProperty openEnquiry={openEnquiry} />
      <PropertyIntroSection openEnquiry={openEnquiry} />
      <ProcessSection steps={PROCESS_PROPERTY} title="Property process" />
      <TrustSection page="property" />
      <FAQSection page="property" />
      <ClosingCTA page="property" openEnquiry={openEnquiry} />
    </>
  );
}

export default PropertyPage;
