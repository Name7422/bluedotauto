"use client";
import React, { useRef, useState } from "react";
import ContactUs from "./ContactUs";

export default function Contact() {
  const formRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: "idle", message: "" });

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
    } catch (error) {
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
      <section className="flat-property">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="inner-heading flex-two flex-wrap">
                <h1 className="heading-listing">Contact us</h1>
                <div className="social-listing flex-six flex-wrap">
                  <p>Share this page:</p>
                  <div className="icon-social style1">
                    <a href="#">
                      <i className="icon-autodeal-facebook" />
                    </a>
                    <a href="#">
                      <i className="icon-autodeal-linkedin" />
                    </a>
                    <a href="#">
                      <i className="icon-autodeal-twitter" />
                    </a>
                    <a href="#">
                      <i className="icon-autodeal-instagram" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="tf-section-map">
        <div className="container-fluid">
          <div className="map">
            <iframe
              className="map-content"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.53!2d-97.5158454!3d35.4416956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87b216c825960ca7%3A0xc7920f91fa7f020f!2s2330%20S%20Robinson%20Ave%2C%20Oklahoma%20City%2C%20OK%2073109%2C%20USA!5e0!3m2!1sen!2sus!4v1711000000000!5m2!1sen!2sus"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
      <section className="tf-section-contact">
        <div className="container">
          <div className="row">
            <div className="col-md-8 contact-left">
              <div className="heading-section mb-30">
                <h2>Drop Us a Line</h2>
                <p className="mt-12">
                  Feel free to connect with us through our online channels for
                  updates, news, and more.
                </p>
              </div>
              <div id="comments" className="comments">
                <div className="respond-comment">
                  <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    id="loan-calculator"
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
                        <label className="font-1 fs-14 fw-5">
                          Email address
                        </label>
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
                        <label className="font-1 fs-14 fw-5">
                          Phone Numbers
                        </label>
                        <input
                          type="tel"
                          className="tb-my-input"
                          name="tel"
                          placeholder="Phone Numbers"
                          required
                        />
                      </fieldset>
                      <fieldset className="phone-wrap style-text">
                        <label className="font-1 fs-14 fw-5">Subject</label>
                        <input
                          type="text"
                          className="tb-my-input"
                          name="subject"
                          placeholder="Enter Keyword"
                          required
                        />
                      </fieldset>
                    </div>
                    <fieldset className="phone-wrap style-text">
                      <label className="font-1 fs-14 fw-5">Your Message</label>
                      <textarea
                        id="comment-message"
                        name="message"
                        rows={4}
                        tabIndex={4}
                        placeholder="Your message"
                        aria-required="true"
                        required
                        defaultValue={""}
                      />
                    </fieldset>
                    <div className="button-boxs">
                      <button
                        className="sc-button"
                        name="submit"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                      </button>
                    </div>
                    {submitState.message ? (
                      <p
                        className="mt-16"
                        style={{
                          color:
                            submitState.type === "success" ? "#198754" : "#dc3545",
                        }}
                      >
                        {submitState.message}
                      </p>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
            <ContactUs />
          </div>
        </div>
      </section>
    </>
  );
}
