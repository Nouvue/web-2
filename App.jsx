import React, { useState, useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { EnquiryFlow } from "./components/EnquiryFlow";
import { StickyMobileCTA } from "./components/StickyMobileCTA";
import HomePage from "./pages/HomePage";
import PropertyPage from "./pages/PropertyPage";
import PrivacyPage from "./pages/legal/PrivacyPage";
import TermsPage from "./pages/legal/TermsPage";
import CancellationsPage from "./pages/legal/CancellationsPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const [enquiry, setEnquiry] = useState(false);
  const location = useLocation();
  const page = location.pathname === "/property" ? "property" : "home";

  const openEnquiry = useCallback((service) => setEnquiry(service || true), []);
  const closeEnquiry = useCallback(() => setEnquiry(false), []);

  return (
    <div className="nv-root">
      <ScrollToTop />
      <Nav openEnquiry={openEnquiry} />

      <Routes>
        <Route path="/" element={<HomePage openEnquiry={openEnquiry} />} />
        <Route path="/property" element={<PropertyPage openEnquiry={openEnquiry} />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/cancellations" element={<CancellationsPage />} />
        {/* Unknown routes fall back to Home rather than a dead end. */}
        <Route path="*" element={<HomePage openEnquiry={openEnquiry} />} />
      </Routes>

      <Footer />
      <StickyMobileCTA page={page} openEnquiry={openEnquiry} enquiryOpen={!!enquiry} />

      {enquiry && (
        <EnquiryFlow defaultService={enquiry === true ? "" : enquiry} onClose={closeEnquiry} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
