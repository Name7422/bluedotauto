"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Pricing from "../common/Pricing";
import Image from "next/image";
import Link from "next/link";
import DropdownSelect from "../common/DropDownSelect";
import { initialState, reducer } from "@/reducer/carFilterReducer";
import Pagination from "../common/Pagination";
import ListGridToggler from "./ListGridToggler";
import FilterSidebar from "./FilterSidebar";
export default function Cars1() {
  const [allCars, setAllCars] = useState([]);
  const [filterOpts, setFilterOpts] = useState({ makes: [], models: [], colors: [], transmissions: [] });
  const [state, dispatch] = useReducer(reducer, initialState);
  const searchParams = useSearchParams();
  const initialParamsApplied = useRef(false);

  useEffect(() => {
    fetch("/assets/cars.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = data.map((car, index) => ({
          id: car.StockID || index,
          year: car.Year,
          type: car.Model,
          title: car.Title,
          km: car.Mileage,
          fuelType: "Petrol",
          transmission: car.Transmission,
          price: car.Price,
          location: "",
          model: car.Model,
          make: car.Make,
          body: "",
          color: car.ExteriorColor || "Black",
          cylinder: 0,
          door: 0,
          features: [],
          authorImage: "/assets/images/author/avt-cm3.jpg",
          imgSrc: car.Minio_Images?.[0] || "/assets/images/car-list/car2.jpg",
          images: car.Minio_Images?.map((src, idx) => ({
            src,
            alt: `car image ${idx + 1}`,
            width: 615,
            height: 462,
          })) || [],
        }));
        setAllCars(transformedData);
        dispatch({ type: "SET_FILTERED", payload: transformedData });

        const unique = (arr) => [...new Set(arr.filter(Boolean))].sort();
        setFilterOpts({
          makes: unique(data.map((c) => c.Make)),
          models: unique(data.map((c) => c.Model).map(String)),
          colors: unique(data.map((c) => c.ExteriorColor)),
          transmissions: unique(data.map((c) => c.Transmission)),
        });
      })
      .catch((err) => console.error("Error loading cars:", err));
  }, []);
  // Apply URL search params as initial filter once cars are loaded
  useEffect(() => {
    if (allCars.length === 0 || initialParamsApplied.current) return;
    initialParamsApplied.current = true;

    const urlMake = searchParams.get("make");
    const urlModel = searchParams.get("model");
    const urlTransmission = searchParams.get("transmission");
    const urlColor = searchParams.get("color");
    const urlPriceMin = searchParams.get("priceMin");
    const urlPriceMax = searchParams.get("priceMax");
    const urlKmMin = searchParams.get("kmMin");
    const urlKmMax = searchParams.get("kmMax");
    const urlYearMin = searchParams.get("yearMin");
    const urlYearMax = searchParams.get("yearMax");

    if (urlMake) dispatch({ type: "SET_MAKE", payload: urlMake });
    if (urlModel) dispatch({ type: "SET_MODEL", payload: urlModel });
    if (urlTransmission) dispatch({ type: "SET_TRANSMISSION", payload: urlTransmission });
    if (urlColor) dispatch({ type: "SET_COLOR", payload: urlColor });
    if (urlPriceMin && urlPriceMax)
      dispatch({ type: "SET_PRICE", payload: [parseInt(urlPriceMin), parseInt(urlPriceMax)] });
    if (urlKmMin && urlKmMax)
      dispatch({ type: "SET_KM", payload: [parseInt(urlKmMin), parseInt(urlKmMax)] });
    if (urlYearMin && urlYearMax)
      dispatch({ type: "SET_YEAR", payload: [parseInt(urlYearMin), parseInt(urlYearMax)] });
  }, [allCars]);

  const {
    price,
    km,
    year,
    make,
    model,
    transmission,
    color,
    filtered,
    sortingOption,
    sorted,
    currentPage,
    itemPerPage,
  } = state;

  const allProps = {
    ...state,
    setPrice: (value) => dispatch({ type: "SET_PRICE", payload: value }),
    setYear: (value) => dispatch({ type: "SET_YEAR", payload: value }),
    setModel: (value) => dispatch({ type: "SET_MODEL", payload: value }),
    setKM: (value) => dispatch({ type: "SET_KM", payload: value }),
    setMake: (value) => dispatch({ type: "SET_MAKE", payload: value }),
    setTransmission: (value) =>
      dispatch({ type: "SET_TRANSMISSION", payload: value }),
    setColor: (value) => dispatch({ type: "SET_COLOR", payload: value }),
    setSortingOption: (value) =>
      dispatch({ type: "SET_SORTING_OPTION", payload: value }),
    setCurrentPage: (value) =>
      dispatch({ type: "SET_CURRENT_PAGE", payload: value }),
    setItemPerPage: (value) => {
      dispatch({ type: "SET_CURRENT_PAGE", payload: 1 }),
        dispatch({ type: "SET_ITEM_PER_PAGE", payload: value });
    },
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR_FILTER" });
  };

  useEffect(() => {
    let filteredArrays = [];

    if (make !== "Any Make") {
      const filteredBymake = [...allCars].filter((elm) => make === elm.make);
      filteredArrays = [...filteredArrays, filteredBymake];
    }
    if (model !== "Any Model") {
      const filteredBymodel = [...allCars].filter((elm) => model === elm.model);
      filteredArrays = [...filteredArrays, filteredBymodel];
    }
    if (transmission !== "Any Transmission") {
      const filteredByTransmission = [...allCars].filter(
        (elm) => transmission === elm.transmission
      );
      filteredArrays = [...filteredArrays, filteredByTransmission];
    }
    if (color !== "Any Color") {
      const filteredBycolor = [...allCars].filter((elm) => color === elm.color);
      filteredArrays = [...filteredArrays, filteredBycolor];
    }

    const filteredByPrice = [...allCars].filter(
      (elm) => elm.price >= price[0] && elm.price <= price[1]
    );
    filteredArrays = [...filteredArrays, filteredByPrice];
    const filteredBykm = [...allCars].filter(
      (elm) => elm.km >= km[0] && elm.km <= km[1]
    );
    filteredArrays = [...filteredArrays, filteredBykm];
    const filteredByyear = [...allCars].filter(
      (elm) => elm.year >= year[0] && elm.year <= year[1]
    );
    filteredArrays = [...filteredArrays, filteredByyear];

    const commonItems = [...allCars].filter((item) =>
      filteredArrays.every((array) => array.includes(item))
    );
    dispatch({ type: "SET_FILTERED", payload: commonItems });
  }, [
    price,
    km,
    year,
    make,
    model,
    transmission,
    color,
  ]);

  useEffect(() => {
    if (sortingOption === "Price Ascending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => a.price - b.price),
      });
    } else if (sortingOption === "Price Descending") {
      dispatch({
        type: "SET_SORTED",
        payload: [...filtered].sort((a, b) => b.price - a.price),
      });
    } else {
      dispatch({ type: "SET_SORTED", payload: filtered });
    }
    dispatch({ type: "SET_CURRENT_PAGE", payload: 1 });
  }, [filtered, sortingOption]);

  const [isGrid, setIsGrid] = useState(false);

  return (
    <>
      <section className="listing-grid tf-section3">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="heading-section">
                <h2>10,000+ Get The Best Deals On Used Cars</h2>
                <p className="mt-20">
                  Explore our selection of high-quality, pre-owned vehicles. Our
                  inventory includes top brands like Toyota, Mercedes, Honda,
                  and more. Find the perfect used car for your needs.
                </p>
              </div>
            </div>
            <div className="col-lg-12 flex gap-30 text-start">
              <div className="sidebar-right-listing style-2">
                <div className="sidebar-title flex-two flex-wrap">
                  <h4>Filters and Sort</h4>
                  <a
                    className="fw-5 font claer text-color-2"
                    onClick={clearFilter}
                  >
                    <i className="icon-autodeal-plus" />
                    Clear
                  </a>
                </div>
                <div className="form-filter-siderbar">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="wd-find-select">
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={make}
                            onChange={allProps.setMake}
                            options={["Any Make", ...filterOpts.makes]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={model}
                            onChange={allProps.setModel}
                            options={["Any Model", ...filterOpts.models]}
                          />
                        </div>
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Price: ${price[0].toLocaleString()} - ${price[1].toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={0}
                            MAX={130000}
                            priceRange={price}
                            setPriceRange={allProps.setPrice}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={transmission}
                            onChange={allProps.setTransmission}
                            options={["Any Transmission", ...filterOpts.transmissions]}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="group-select">
                          <DropdownSelect
                            selectedValue={color}
                            onChange={allProps.setColor}
                            options={["Any Color", ...filterOpts.colors]}
                          />
                        </div>
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Year: {year[0]} - {year[1]}
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={2015}
                            MAX={2025}
                            priceRange={year}
                            setPriceRange={allProps.setYear}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                      <div className="form-group wg-box3">
                        <div className="widget widget-price">
                          <div className="caption flex-two">
                            <div>
                              <span className="fw-6">
                                Miles: {km[0].toLocaleString()} mi - {km[1].toLocaleString()} mi
                              </span>
                            </div>
                          </div>
                          <Pricing
                            MIN={0}
                            MAX={170000}
                            priceRange={km}
                            setPriceRange={allProps.setKM}
                          />
                        </div>
                        {/* /.widget_price */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="sidebar-left-listing">
                <div className="row">
                  <div className="col-lg-12 listing-list-car-wrap">
                    <div className="category-filter flex justify-space align-center mb-30 flex-wrap gap-8">
                      <div className="box-1 flex align-center flex-wrap gap-8">
                        <p className="">
                          {" "}
                          {sorted.length ? (
                            <>
                              Showing {(currentPage - 1) * itemPerPage + 1} -{" "}
                              {currentPage * itemPerPage} Of {sorted.length}{" "}
                              results{" "}
                            </>
                          ) : (
                            "No results found. Please try another filter"
                          )}
                        </p>
                        <div className="filter-mobie">
                          <a
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight"
                            className="filter"
                          >
                            Filter
                            <i className="icon-autodeal-filter" />
                          </a>
                        </div>
                      </div>
                      <div className="box-2 flex flex-wrap gap-8">
                        <ListGridToggler
                          isGrid={isGrid}
                          setIsGrid={setIsGrid}
                        />
                        <div className="wd-find-select flex gap-8">
                          <div className="group-select">
                            <DropdownSelect
                              onChange={(value) => {
                                const match = value.match(/\d+/); // Match the digits in the value
                                if (match) {
                                  allProps.setItemPerPage(
                                    parseInt(match[0], 10)
                                  );
                                }
                              }}
                              addtionalParentClass="list-page"
                              options={["Show: 6", "Show: 9", "Show: 12"]}
                            />
                          </div>
                          <div className="group-select">
                            <DropdownSelect
                              selectedValue={sortingOption}
                              onChange={allProps.setSortingOption}
                              addtionalParentClass="list-sort"
                              options={[
                                "Sort by (Default)",

                                "Price Ascending",
                                "Price Descending",
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`list-car-list-1 ${
                        isGrid ? "list-car-grid-1" : ""
                      } `}
                    >
                      {sorted
                        .slice(
                          (currentPage - 1) * itemPerPage,
                          currentPage * itemPerPage
                        )
                        .map((car, i) => (
                          <div key={i} className="box-car-list style-2 hv-one">
                            <div className="image-group relative">
                              <div className="top flex-two">
                                <ul className="d-flex gap-8">
                                  <li className="flag-tag success">Featured</li>
                                  <li className="flag-tag style-1">
                                    <div className="icon">
                                      <svg
                                        width={16}
                                        height={13}
                                        viewBox="0 0 16 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                          stroke="white"
                                          strokeWidth="1.5"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </div>
                                    6
                                  </li>
                                </ul>
                                <div className="year flag-tag">{car.year}</div>
                              </div>
                              <ul className="change-heart flex">
                                <li className="box-icon w-32">
                                  <a
                                    data-bs-toggle="offcanvas"
                                    data-bs-target="#offcanvasBottom"
                                    aria-controls="offcanvasBottom"
                                    className="icon"
                                  >
                                    <svg
                                      width={18}
                                      height={18}
                                      viewBox="0 0 18 18"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </a>
                                </li>
                                <li className="box-icon w-32">
                                  <Link href={`/my-favorite`} className="icon">
                                    <svg
                                      width={18}
                                      height={16}
                                      viewBox="0 0 18 16"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                                        stroke="CurrentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
                                  </Link>
                                </li>
                              </ul>
                              <div className="img-style">
                                <Image
                                  className="lazyload"
                                  alt="image"
                                  src={car.imgSrc}
                                  width={450}
                                  height={338}
                                />
                              </div>
                            </div>
                            <div className="content">
                              <div className="inner1">
                                <div className="text-address">
                                  <p className="text-color-3 font">
                                    {car.type}
                                  </p>
                                </div>
                                <h5 className="link-style-1">
                                  <Link href={`/listing-detail-v1/${car.id}`}>
                                    {car.title}
                                  </Link>
                                </h5>
                                <div className="icon-box flex flex-wrap">
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-km1" />
                                    <span>{car.km.toLocaleString()} mi</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-diesel" />
                                    <span>{car.fuelType}</span>
                                  </div>
                                  <div className="icons flex-three">
                                    <i className="icon-autodeal-automatic" />
                                    <span>{car.transmission}</span>
                                  </div>
                                </div>
                                <div className="money fs-20 fw-5 lh-25 text-color-3">
                                  ${car.price.toLocaleString()}
                                </div>
                                <Link
                                  href={`/listing-detail-v1/${car.id}`}
                                  className="view-car"
                                >
                                  View details
                                  <i className="icon-autodeal-btn-right" />
                                </Link>
                              </div>
                              <div className="inner2">
                                <div className="days-box">
                                 
                                  <Link
                                    href={`/listing-detail-v1/${car.id}`}
                                    className="view-car"
                                  >
                                    View car
                                  </Link>
                                  <a href="tel:+14053635049" className="chat">
                                    <span>+1(405) 363-5049</span>
                                  </a>
                                  <a href="mailto:sales@bluedotauto.com" className="chat">
                                    <span>sales@bluedotauto.com</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    <div className="themesflat-pagination clearfix mt-40">
                      <ul>
                        <Pagination
                          currentPage={currentPage}
                          setPage={(value) => allProps.setCurrentPage(value)}
                          itemLength={sorted.length}
                          itemPerPage={itemPerPage}
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FilterSidebar allProps={allProps} clearFilter={clearFilter} filterOpts={filterOpts} />
    </>
  );
}
