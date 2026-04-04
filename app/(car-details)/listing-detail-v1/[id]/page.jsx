import CarDetails1 from "@/components/carDetails/CarDetails1";
import Footer1 from "@/components/footers/Footer1";
import Header2 from "@/components/headers/Header2";
import React from "react";
import Link from "next/link";
import { promises as fs } from "fs";
import path from "path";
import { transformCar } from "@/utils/transformCar";
export const metadata = {
  title:
    "Car Details 01 || BlueDotAutos - Car Dealer, Rental & Listing",
  description: "BlueDotAutos - Car Dealer, Rental & Listing",
};
export default async function page({ params }) {
  const filePath = path.join(process.cwd(), "public", "assets", "cars.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const data = JSON.parse(raw);
  const cars = data.map((car, i) => transformCar(car, i));
  const carItem = cars.find((c) => String(c.id) === String(params.id)) || cars[0];
  const recommendedCars = cars.filter((c) => c.id !== carItem.id).slice(0, 4);
  return (
    <>
      <div className="header-fixed">
        <Header2 />
      </div>
      <section className="flat-title mb-40">
        <div className="container2">
          <div className="row">
            <div className="col-lg-12">
              <div className="title-inner style">
                <div className="title-group fs-12">
                  <Link className="home fw-6 text-color-3" href={`/`}>
                    Home
                  </Link>
                  <span>Used cars for sale</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CarDetails1 carItem={carItem} recommendedCars={recommendedCars} />
      <Footer1 />
    </>
  );
}
