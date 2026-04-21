import React from "react";

export default function Overview({ carItem = {} }) {
  const fields = [
    { label: "Condition:", value: "Used" },
    { label: "Cylinders:", value: carItem.cylinder ?? "N/A" },
    { label: "Fuel Type:", value: carItem.fuelType || "N/A" },
    { label: "Doors:", value: carItem.door ?? "N/A" },
    { label: "Year:", value: carItem.year || "N/A" },
    { label: "Color:", value: carItem.color || "N/A" },
    { label: "Transmission:", value: carItem.transmission || "N/A" },
    { label: "Engine:", value: carItem.engine || "N/A" },
    { label: "Make:", value: carItem.make || "N/A" },
    { label: "Model:", value: carItem.model || "N/A" },
    {
      label: "Mileage:",
      value:
        carItem.km != null
          ? `${Number(carItem.km).toLocaleString()} mi`
          : "N/A",
    },
  ];

  return (
    <div className="tfcl-listing-info tf-collapse-content mt-30">
      <div className="row">
        {fields.map((field, i) => (
          <div key={i} className="col-xl-6 col-md-6 item">
            <div className="inner listing-infor-box">
              <div className="content-listing-info">
                <span className="listing-info-title">{field.label}</span>
                <p className="listing-info-value">{field.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
