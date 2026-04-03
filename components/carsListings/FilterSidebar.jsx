"use client";

import Pricing from "../common/Pricing";
import DropdownSelect from "../common/DropDownSelect";

export default function FilterSidebar({ allProps, clearFilter, filterOpts = { makes: [], models: [], colors: [], transmissions: [] } }) {
  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasRight">
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvasRightLabel">
          Filters and Sort
        </h4>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body">
        <a
          className="tf-btn-arrow wow fadeInUpSmall clear-filter mb-2"
          onClick={clearFilter}
        >
          <i
            className="icon-autodeal-plus "
            style={{ transform: "rotate(25deg)" }}
          />{" "}
          Clear Filter
        </a>
        <div className="form-filter-siderbar">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="wd-find-select">
              <div className="form-group">
                <div className="group-select">
                  <DropdownSelect
                    selectedValue={allProps.make}
                    onChange={allProps.setMake}
                    options={["Any Make", ...filterOpts.makes]}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="group-select">
                  <DropdownSelect
                    selectedValue={allProps.model}
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
                        Price: ${allProps.price[0].toLocaleString()} - ${allProps.price[1].toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Pricing
                    MIN={0}
                    MAX={130000}
                    priceRange={allProps.price}
                    setPriceRange={allProps.setPrice}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="group-select">
                  <DropdownSelect
                    selectedValue={allProps.transmission}
                    onChange={allProps.setTransmission}
                    options={["Any Transmission", ...filterOpts.transmissions]}
                  />
                </div>
              </div>
              <div className="form-group">
                <div className="group-select">
                  <DropdownSelect
                    selectedValue={allProps.color}
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
                        Year: {allProps.year[0]} - {allProps.year[1]}
                      </span>
                    </div>
                  </div>
                  <Pricing
                    MIN={2015}
                    MAX={2025}
                    priceRange={allProps.year}
                    setPriceRange={allProps.setYear}
                  />
                </div>
              </div>
              <div className="form-group wg-box3">
                <div className="widget widget-price">
                  <div className="caption flex-two">
                    <div>
                      <span className="fw-6">
                        KM: {allProps.km[0].toLocaleString()} km - {allProps.km[1].toLocaleString()} km
                      </span>
                    </div>
                  </div>
                  <Pricing
                    MIN={0}
                    MAX={170000}
                    priceRange={allProps.km}
                    setPriceRange={allProps.setKM}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
