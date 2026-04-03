"use client";
import React from "react";

export default function Contact() {
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
                    action="mailto:support@bluedotauto.com"
                    method="post"
                    encType="text/plain"
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
                      <button className="sc-button" name="submit" type="submit">
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-md-4 contact-right">
              <div className="contact-info box-sd">
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
                    <p>1-333-345-6868</p>
                    <p>support@bluedotauto.com</p>
                  </div>
                  <div className="box-info">
                    <h5>Opentime:</h5>
                    <p>Monay - Friday: 08:00 - 20:00</p>
                    <p>Saturday - Sunday: 10:00 - 18:00</p>
                  </div>
                  <div className="box-info">
                    <h5>Follow Us:</h5>
                    <div className="icon-social style2">
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
        </div>
      </section>
    </>
  );
}
