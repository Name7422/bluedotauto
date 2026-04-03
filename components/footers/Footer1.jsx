"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { footerData } from "@/data/footerLinks";
export default function Footer1() {
  useEffect(() => {
    const headings = document.querySelectorAll(".footer-heading-mobie");

    const toggleOpen = (event) => {
      const parent = event.target.closest(".footer-col-block");
      const content = parent.querySelector(".tf-collapse-content");

      if (parent.classList.contains("open")) {
        parent.classList.remove("open");
        content.style.height = "0px";
        content.style.padding = "0px 0px";
      } else {
        parent.classList.add("open");
        content.style.height = content.scrollHeight + 10 + "px";
        content.style.padding = "10px 0px";
      }
    };

    headings.forEach((heading) => {
      heading.addEventListener("click", toggleOpen);
    });

    // Clean up event listeners when the component unmounts
    return () => {
      headings.forEach((heading) => {
        heading.removeEventListener("click", toggleOpen);
      });
    };
  }, []); // Empty dependency array means this will run only once on mount
  return (
    <footer id="footer" className="clearfix home">
      <div style={{paddingTop: "50px"}} className="container">
        <div className="footer-main">
          <div className="row">
            {footerData.map((column, index) => (
              <div className="col-lg-3 col-sm-6 col-12" key={index}>
                <div className="widget widget-menu footer-col-block">
                  <div className="footer-heading-desktop">
                    <h4>{column.heading}</h4>
                  </div>
                  <div className="footer-heading-mobie ">
                    <h4>{column.heading}</h4>
                  </div>
                  <ul className="box-menu tf-collapse-content">
                    {column.menuItems.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <Link href={item.href}>{item.text}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            <div className="col-lg-3 col-sm-6 col-12">
              <div className="widget widget-menu widget-form footer-col-block">
                <div className="footer-heading-desktop">
                  <h4>Newsletter</h4>
                </div>
                <div className="footer-heading-mobie">
                  <h4>Newsletter</h4>
                </div>
                <div className="tf-collapse-content">
                  <form
                    action="mailto:support@bluedotauto.com"
                    method="post"
                    encType="text/plain"
                    className="comment-form form-submit"
                  >
                    <p className="font-2">
                      Stay on top of the latest car trends, tips, and tricks for
                      selling your car.
                    </p>
                    <div className="text-wrap clearfix">
                      <fieldset className="email-wrap style-text">
                        <input
                          type="email"
                          className="tb-my-input"
                          name="email"
                          placeholder="Your email address"
                          required
                        />
                      </fieldset>
                    </div>
                    <button
                      name="submit"
                      type="submit"
                      className="button btn-submit-comment btn-1 btn-8"
                    >
                      <span>Send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="row">
            <div className="col-lg-4 col-md-12">
              <div className="logo-footer style box-1">
                <Link href={`/`}>
                  <div className="logo-text">BLUEDOTAUTOS</div>
                </Link>
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="footer-bottom-right flex-six flex-wrap">
                <div className="title-bottom center">
                  © 2026 Blue Dot Autos. All rights reserved
                </div>
                <div className="icon-social box-3 text-color-1">
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
                  <a href="#">
                    <i className="icon-autodeal-youtube" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
