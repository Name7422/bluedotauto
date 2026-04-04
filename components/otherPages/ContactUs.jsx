"use client";
import React from "react";

export default function ContactUs() {
    return (
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
    )
}