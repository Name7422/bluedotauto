"use client";

import React, { useEffect, useState, useRef } from "react";
import Slider1 from "./sliders/Slider1";
import Description from "./detailComponents/Description";
import Overview from "./detailComponents/Overview";
import CarInfo from "./detailComponents/CarInfo";
import Recommended from "./detailComponents/Recommended";
export default function CarDetails1({ carItem, recommendedCars = [] }) {
  const [openForm, setOpenForm] = useState(true);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "idle", message: "" });

  useEffect(() => {
    if (!isContactModalOpen) {
      return undefined;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactModalOpen]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formRef.current || isSubmitting) return;
    const formData = new FormData(formRef.current);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      tel: formData.get("tel"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    setIsSubmitting(true);
    setSubmitState({ type: "idle", message: "" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Unknown error");

      formRef.current.reset();
      setSubmitState({
        type: "success",
        message: "Your message has been sent. We will get back to you shortly.",
      });
      setOpenForm(false);
    } catch (error) {
      setOpenForm(true);
      setSubmitState({
        type: "error",
        message: error.message || "We could not send your message right now. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="tf-section3 listing-detail style-1">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-8 order-1 order-lg-1">
              <Slider1 images={carItem.images || []} />
            </div>
            <div className="col-12 col-lg-4 order-2 order-lg-2">
              <div className="listing-sidebar">
                <div className="widget-listing mb-40">
                  <div className="heading-widget">
                    <h2 className="title">{carItem.title}</h2>
                    <CarInfo carItem={carItem} />
                    <button
                      type="button"
                      className="sc-button d-lg-none mt-20"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      <span>Check vehicle availability</span>
                      <i className="icon-autodeal-next" />
                    </button>
                  </div>
                </div>
                <div className="contact-info box-sd mb-40">
                  <h2 className="mb-30">Contact Us</h2>
                  <div className="wrap-info">
                    <div className="box-info">
                      <h5>Address</h5>
                      <p>
                        2330 S Robinson Ave, Oklahoma City, OK 73109 <br />
                        United States
                      </p>
                    </div>
                    <div className="box-info">
                      <h5>Infomation:</h5>
                      <p>+1(405) 363-5049</p>
                      <p>sales@bluedotauto.com</p>
                    </div>
                    <button
                      type="button"
                      className="sc-button d-none d-lg-flex"
                      onClick={() => setIsContactModalOpen(true)}
                    >
                      <span>Check vehicle availability</span>
                      <i className="icon-autodeal-next" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 order-3 order-lg-3">
              <div className="listing-detail-wrap">
                <div className="row">
                  <div className="col-lg-12">
                    <nav
                      id="navbar-example2"
                      className="navbar tab-listing-scroll"
                    >
                      <ul className="nav nav-pills">
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading1">
                            Overview
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading2">
                            Specs &amp; features
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading3">
                            Recommended cars
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading4">
                            Loan calculator
                          </a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#scrollspyHeading5">
                            New car reviews
                          </a>
                        </li>
                      </ul>
                    </nav>
                    <div
                      data-bs-spy="scroll"
                      data-bs-target="#navbar-example2"
                      data-bs-offset={0}
                      className="scrollspy-example"
                      tabIndex={0}
                    >
                      <div className="listing-description mb-40">
                        <div className="tfcl-listing-header">
                          <h2>Description</h2>
                        </div>
                        <Description carItem={carItem} />
                      </div>
                      <div
                        className="listing-description footer-col-block"
                        id="scrollspyHeading1"
                      >
                        <div className="footer-heading-desktop">
                          <h2>Car overview</h2>
                        </div>
                        <div className="footer-heading-mobie listing-details-mobie">
                          <h2>Car overview</h2>
                        </div>
                        <Overview carItem={carItem} />
                      </div>
                      <div className="widget-listing mt-40">
                        <div className="listing-header mb-30">
                          <h3>Recommended Used Cars</h3>
                          <p>Showing 26 more cars you might like</p>
                        </div>
                        <Recommended cars={recommendedCars} />
                        <a href="#" className="fs-16 fw-5 font text-color-3 lh-22">
                          View more reviews <i className="icon-autodeal-view-more" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isContactModalOpen ? (
        <div
          onClick={() => setIsContactModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(16, 24, 40, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            zIndex: 1050,
          }}
        >
          <div
            className="comments"
            role="dialog"
            aria-modal="true"
            aria-labelledby="inventory-contact-modal-title"
            onClick={(event) => event.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "760px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              boxShadow: "0 24px 80px rgba(15, 23, 42, 0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <div>
                <h2 id="inventory-contact-modal-title" className="mb-12">
                  Search inventory
                </h2>
                <p className="text-color-2 mb-0">
                  Leave your details and your email client will open a prepared
                  message for {carItem?.title || "this vehicle"}.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                aria-label="Close contact form"
                style={{
                  border: "0",
                  background: "transparent",
                  fontSize: "28px",
                  lineHeight: 1,
                  color: "#111827",
                }}
              >
                ×
              </button>
            </div>
            <div className="respond-comment">
              {!openForm ? (
                <>
                  <div
                    className="mt-16"
                    style={{
                      background: "#e6f9f0",
                      border: "1px solid #198754",
                      borderRadius: "12px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>✅</span>
                    <p
                      style={{
                        margin: 0,
                        color: "#198754",
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      Thank you for your message. We will get back to you soon.
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} className="button-boxs">
                    <button style={{ margin: "30px", border: "none" }} className="sc-button" onClick={() => setOpenForm(true)}><span>Send Another Message</span></button>
                  </div>
                </>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="comment-form form-submit"
                >
                  <div className="grid-sw-2">
                    <fieldset className="email-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Name</label>
                      <input
                        type="text"
                        className="tb-my-input"
                        name="name"
                        placeholder="Your name"
                        required
                      />
                    </fieldset>
                    <fieldset className="phone-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Email address</label>
                      <input
                        type="email"
                        className="tb-my-input"
                        name="email"
                        placeholder="Your email"
                        required
                      />
                    </fieldset>
                  </div>
                  <div className="grid-sw-2">
                    <fieldset className="email-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Phone number</label>
                      <input
                        type="tel"
                        className="tb-my-input"
                        name="tel"
                        placeholder="Phone number"
                        required
                      />
                    </fieldset>
                    <fieldset className="phone-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Vehicle</label>
                      <input
                        type="text"
                        className="tb-my-input"
                        name="subject"
                        defaultValue={carItem?.title || ""}
                        readOnly
                      />
                    </fieldset>
                  </div>
                  <fieldset className="phone-wrap style-text">
                    <label className="font-1 fs-14 fw-5">Your message</label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Tell us what you are looking for"
                      aria-required="true"
                      defaultValue={`Hello, I am interested in ${carItem?.title || "this vehicle"}. Please share available inventory and next steps.`}
                      required
                    />
                  </fieldset>
                  <div
                    className="button-boxs"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button className="sc-button" type="submit">
                      <span>Send</span>
                    </button>
                    <button
                      type="button"
                      className="sc-button"
                      onClick={() => setIsContactModalOpen(false)}
                      style={{ backgroundColor: "#e5e7eb", color: "#111827" }}
                    >
                      <span>Cancel</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
