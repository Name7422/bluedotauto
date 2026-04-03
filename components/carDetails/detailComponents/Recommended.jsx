import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Recommended({ cars = [] }) {
  return (
    <div className="listing-recommended mb-30">
      {cars.slice(0, 4).map((elm, i) => (
        <div key={i} className="item flex">
          <div className="image">
            <Image
              className="lazyload"
              alt="image"
              src={elm.imgSrc}
              width={450}
              height={338}
            />
          </div>
          <div className="content">
            <h6>
              <Link href={`/listing-detail-v1/${elm.id}`}>{elm.title}</Link>
            </h6>
            <p className="fs-14 fw-7 text-color-2 font-1">
              ${elm.price.toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
