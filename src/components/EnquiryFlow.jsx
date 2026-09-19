import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_EMAIL_HREF, CONTACT_PHONE_HREF } from "../config";

const STAGES = ["Location + service", "Property + date", "Priorities", "Access + details", "Contact", "Review"];

const ADDITION_OPTIONS = ["Oven interior", "Fridge interior", "Inside kitchen cupboards", "Interior windows", "Kitchen detail reset", "Something else"];

const UK_POSTCODE_RE = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UK_PHONE_RE = /^(?:\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/;

function EnquiryFlow({ defaultService, onClose }) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState("idle"); // idle | validating | submitting | success | error
  const [errors, setErrors] = useState({});
  const drawerRef = useRef(null);
  const [data, setData] = useState({
    postcode: "",
    service: defaultService || "regular",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    date: "",
    priorities: "",
    additions: [],
    pets: "",
    access: "",
    notes: "",
    name: "",
    email: "",
    phone: "",
    privacyAck: false,
  });

  // Accessibility: trap focus, close on Escape, lock background scroll,
  // and restore focus to whatever opened the drawer when it closes.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusFirst = () => {
      const node = drawerRef.current;
      if (!node) return;
      const focusable = node.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
      else node.focus();
    };
    focusFirst();

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.disabled);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKeyDown);
      if (previouslyFocused && previouslyFocused.focus) previouslyFocused.focus();
    };
  }, [onClose]);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const toggle = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.checked }));
  const toggleAddition = (name) => (e) =>
    setData((d) => ({
      ...d,
      additions: e.target.checked ? [...d.additions, name] : d.additions.filter((a) => a !== name),
    }));

  const validateStep = (s) => {
    const e = {};
    if (s === 0) {
      if (!data.postcode.trim()) e.postcode = "Enter a postcode so we can confirm coverage.";
      else if (!UK_POSTCODE_RE.test(data.postcode.trim())) e.postcode = "That doesn't look like a UK postcode.";
    }
    if (s === 4) {
      if (!data.name.trim()) e.name = "Enter a name.";
      if (!data.email.trim()) e.email = "Enter an email address.";
      else if (!EMAIL_RE.test(data.email.trim())) e.email = "Enter a valid email address.";
      if (data.phone.trim() && !UK_PHONE_RE.test(data.phone.trim())) e.phone = "Enter a valid UK mobile number.";
    }
    if (s === 5) {
      if (!data.privacyAck) e.privacyAck = "Please confirm you've read the Privacy Notice to send this request.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STAGES.length - 1));
  };
  const back = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  // Netlify Forms submission. Netlify only recognises a form if a static
  // copy of it (matching name + field names) exists in the built HTML —
  // see the hidden form in index.html. This function does the real
  // client-side submission against that registered form. It genuinely
  // fails (and shows the error state) on any non-2xx response or network
  // error — there is no fabricated success path.
  const encodeForm = (obj) =>
    Object.keys(obj)
      .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
      .join("&");

  const submit = async () => {
    const e = { ...validateStep(4), ...validateStep(5) };
    if (Object.keys(e).length) {
      setErrors(e);
      setStep(e.name || e.email || e.phone ? 4 : 5);
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": "nouvue-enquiry",
          "bot-field": "",
          service: data.service,
          postcode: data.postcode,
          propertyType: data.propertyType,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          date: data.date,
          priorities: data.priorities,
          additions: data.additions.join(", "),
          pets: data.pets || "",
          access: data.access,
          notes: data.notes || "",
          name: data.name,
          email: data.email,
          phone: data.phone,
          privacyAck: data.privacyAck ? "yes" : "no",
        }),
      });
      if (!res.ok) throw new Error(`Submission failed: ${res.status}`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="nv-drawer-overlay" onClick={onClose}>
      <div className="nv-drawer" ref={drawerRef} tabIndex={-1} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Enquiry form">
        <div className="nv-drawer-head">
          <button className="nv-drawer-close" onClick={onClose} aria-label="Close enquiry form">×</button>
          {status === "idle" && (
            <div className="nv-progress">
              {STAGES.map((s, i) => (
                <span key={s} className={`nv-progress-dot${i <= step ? " nv-progress-dot-active" : ""}`} />
              ))}
            </div>
          )}
        </div>

        <div className="nv-drawer-body">
          {status === "submitting" && (
            <div className="nv-status-block">
              <p className="nv-eyebrow">Sending</p>
              <h3 className="nv-h2-mid">Sending your enquiry…</h3>
            </div>
          )}

          {status === "success" && (
            <div className="nv-status-block">
              <p className="nv-eyebrow">Received</p>
              <h3 className="nv-h2-mid">Request received.</h3>
              <p className="nv-lede">We'll review the details and contact you using the information provided.</p>
              <button className="nv-btn nv-btn-primary" onClick={onClose}>Done</button>
            </div>
          )}

          {status === "error" && (
            <div className="nv-status-block">
              <p className="nv-eyebrow">Not sent</p>
              <h3 className="nv-h2-mid">Your request could not be sent.</h3>
              <p className="nv-lede">
                Please email <a href={CONTACT_EMAIL_HREF}>{CONTACT_EMAIL}</a> or call{" "}
                <a href={CONTACT_PHONE_HREF}>{CONTACT_PHONE}</a>.
              </p>
              <button className="nv-btn nv-btn-primary" onClick={onClose}>Close</button>
            </div>
          )}

          {status === "idle" && (
            <>
              <p className="nv-eyebrow">{STAGES[step]}</p>

              {step === 0 && (
                <div className="nv-field-group">
                  <label className="nv-field">
                    <span>Postcode</span>
                    <input
                      value={data.postcode}
                      onChange={set("postcode")}
                      placeholder="e.g. UB8 1AA"
                      aria-invalid={!!errors.postcode}
                      aria-describedby={errors.postcode ? "err-postcode" : undefined}
                    />
                    {errors.postcode && <span className="nv-field-error" id="err-postcode" role="alert">{errors.postcode}</span>}
                  </label>
                  <label className="nv-field">
                    <span>Service</span>
                    <select value={data.service} onChange={set("service")}>
                      <option value="regular">Regular Home Care</option>
                      <option value="housekeeping">Premium Housekeeping</option>
                      <option value="reset">Deep Home Reset</option>
                      <option value="property">Moving &amp; Property Preparation</option>
                      <option value="business">Commercial &amp; Property Care</option>
                    </select>
                  </label>
                  <p className="nv-field-note">This is a request, not a booking. Nothing is charged and no date is confirmed until we get back to you.</p>
                </div>
              )}

              {step === 1 && (
                <div className="nv-field-group">
                  <label className="nv-field">
                    <span>Property type</span>
                    <input value={data.propertyType} onChange={set("propertyType")} placeholder="e.g. flat, terraced house" />
                  </label>
                  <label className="nv-field">
                    <span>Bedrooms</span>
                    <select value={data.bedrooms} onChange={set("bedrooms")}>
                      <option value="">Select…</option>
                      <option value="Studio">Studio</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </label>
                  <label className="nv-field">
                    <span>Bathrooms</span>
                    <select value={data.bathrooms} onChange={set("bathrooms")}>
                      <option value="">Select…</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4+">4+</option>
                    </select>
                  </label>
                  <label className="nv-field">
                    <span>Preferred date</span>
                    <input type="date" value={data.date} onChange={set("date")} />
                  </label>
                </div>
              )}

              {step === 2 && (
                <div className="nv-field-group">
                  <label className="nv-field">
                    <span>What matters most for this visit?</span>
                    <textarea value={data.priorities} onChange={set("priorities")} rows={4} placeholder="e.g. kitchen and bathrooms need the most attention" />
                  </label>
                  <div className="nv-field">
                    <span>Anything you'd like a price for? (optional)</span>
                    <div className="nv-checkbox-grid">
                      {ADDITION_OPTIONS.map((opt) => (
                        <label key={opt} className="nv-field-checkbox" style={{ marginTop: 0 }}>
                          <input type="checkbox" checked={data.additions.includes(opt)} onChange={toggleAddition(opt)} />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                    <p className="nv-field-note">
                      This is a request only — nothing is added to your booking until the price is confirmed.
                    </p>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="nv-field-group">
                  <label className="nv-field">
                    <span>Access details</span>
                    <textarea value={data.access} onChange={set("access")} rows={3} placeholder="e.g. key safe, concierge, parking" />
                  </label>
                  <label className="nv-field">
                    <span>Pets (optional)</span>
                    <input value={data.pets} onChange={set("pets")} placeholder="e.g. one dog, friendly" />
                  </label>
                  <label className="nv-field">
                    <span>Anything else we should know? (optional)</span>
                    <textarea value={data.notes} onChange={set("notes")} rows={3} placeholder="e.g. delicate surfaces, specific instructions" />
                  </label>
                  <p className="nv-field-note">
                    If photos would help us quote, we'll ask you to send them after we reply.
                  </p>
                </div>
              )}

              {step === 4 && (
                <div className="nv-field-group">
                  <label className="nv-field">
                    <span>Name</span>
                    <input value={data.name} onChange={set("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined} />
                    {errors.name && <span className="nv-field-error" id="err-name" role="alert">{errors.name}</span>}
                  </label>
                  <label className="nv-field">
                    <span>Email</span>
                    <input type="email" value={data.email} onChange={set("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined} />
                    {errors.email && <span className="nv-field-error" id="err-email" role="alert">{errors.email}</span>}
                  </label>
                  <label className="nv-field">
                    <span>Mobile (optional)</span>
                    <input type="tel" value={data.phone} onChange={set("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "err-phone" : undefined} />
                    {errors.phone && <span className="nv-field-error" id="err-phone" role="alert">{errors.phone}</span>}
                  </label>
                </div>
              )}

              {step === 5 && (
                <div className="nv-review">
                  <p><b>Service:</b> {data.service}</p>
                  <p><b>Postcode:</b> {data.postcode || "—"}</p>
                  <p><b>Property:</b> {data.propertyType || "—"}{data.bedrooms ? ` · ${data.bedrooms} bed` : ""}{data.bathrooms ? ` · ${data.bathrooms} bath` : ""}</p>
                  <p><b>Date:</b> {data.date || "—"}</p>
                  {data.additions.length > 0 && <p><b>Requested prices for:</b> {data.additions.join(", ")}</p>}
                  <p><b>Contact:</b> {data.name || "—"} · {data.email || "—"} · {data.phone || "—"}</p>

                  <label className="nv-field nv-field-checkbox">
                    <input
                      type="checkbox"
                      checked={data.privacyAck}
                      onChange={toggle("privacyAck")}
                      aria-invalid={!!errors.privacyAck}
                      aria-describedby={errors.privacyAck ? "err-privacy" : undefined}
                    />
                    <span>
                      I have read the <Link to="/privacy">Privacy Notice</Link> and understand that Nouvue will use my
                      details to respond to this enquiry.
                    </span>
                  </label>
                  {errors.privacyAck && <span className="nv-field-error" id="err-privacy" role="alert">{errors.privacyAck}</span>}

                  <p className="nv-field-note">
                    Submitting this form sends a cleaning request only. Nothing is booked or charged until Nouvue
                    confirms availability, scope and price.
                  </p>
                </div>
              )}

              <div className="nv-drawer-nav">
                {step > 0 && (
                  <button className="nv-text-link" onClick={back}>← Back</button>
                )}
                <div style={{ flex: 1 }} />
                {step < STAGES.length - 1 && (
                  <button className="nv-btn nv-btn-primary" onClick={next}>Continue</button>
                )}
                {step === STAGES.length - 1 && (
                  <button className="nv-btn nv-btn-primary" onClick={submit} disabled={status !== "idle"}>Send enquiry</button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export { EnquiryFlow };
