import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <section className="tf-section-banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="tf-image-box style1 bg-orange flex-three">
              <div className="image">
                <Image
                  className="ls-is-cached lazyloaded"
                  data-src="/assets/images/img-box/find-car-1.png"
                  alt="images"
                  src="/assets/images/img-box/find-car-1.png"
                  width={315}
                  height={257}
                />
              </div>
              <div className="content">
                <h3 className="text-color-1">
                  <Link href="/contact">Are you looking for a car?</Link>
                </h3>
                <p className="text-color-1">
                  Save time and effort as you no longer need to visit multiple
                  stores to find the right car.
                </p>
                <Link href={`/contact`} className="find-cars">
                  <span>Find cars</span>
                  <i className="icon-autodeal-search" />
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="tf-image-box style1 bg-black flex-three">
              <div className="image">
                <Image
                  className="ls-is-cached lazyloaded"
                  data-src="/assets/images/img-box/find-car-2.png"
                  alt="images"
                  src="/assets/images/img-box/find-car-2.png"
                  width={315}
                  height={257}
                />
              </div>
              <div className="content">
                <h3 className="text-color-1">
                  <Link href="/contact">Do you want to sell a car?</Link>
                </h3>
                <p className="text-color-1">
                  Find your perfect car match and sell your car quickly with our
                  user-friendly online service.
                </p>
                <a href="#" className="find-cars">
                  <span>Find cars</span>
                  <i className="icon-autodeal-search" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
