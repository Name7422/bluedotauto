import Footer1 from "@/components/footers/Footer1";
import Header1 from "@/components/headers/Header1";
import Banner from "@/components/common/Banner";
import CarBrands from "@/components/homes/home-1/CarBrands";
import CarReview from "@/components/common/CarReview";
import Cars from "@/components/common/Cars";
import Cars2 from "@/components/homes/home-1/Cars2";
import Filter from "@/components/homes/home-1/Filter";
import Hero from "@/components/homes/home-1/Hero";
import Process from "@/components/homes/home-1/Process";
import carsJson from "@/public/assets/cars.json";

export const metadata = {
  title: "Blue Dot Autos | Used Cars for Sale | Best Car Deals Near You",
  description: "Used Cars for Sale | Best Car Deals Near You",
};

const initialCars = carsJson.map((car, index) => ({
  id: car.StockID || index,
  year: car.Year,
  type: "SUV",
  title: car.Title,
  km: car.Mileage,
  fuelType: "Diesel",
  transmission: car.Transmission,
  price: car.Price,
  imgSrc: car.Minio_Images?.[0] || "/assets/images/car-list/car2.jpg",
}));

export default function Home() {
  return (
    <>
      <div className="header-fixed">
        <Header1 />
      </div>
      <Hero />
      <Filter />
      <Cars initialCars={initialCars} />
      <Process />
      <Cars2 />
      <Banner />
      <CarBrands />
      <CarReview />
      <div style={{ marginTop: "50px" }}>
        <Footer1 />
      </div>
    </>
  );
}
