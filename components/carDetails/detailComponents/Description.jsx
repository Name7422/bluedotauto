import React from "react";

export default function Description({ carItem = {} }) {
  return (
    <>
      {" "}
      <div className="tfcl-listing-info mt-30">
        {carItem.description ? (
          <p>{carItem.description}</p>
        ) : (
          <p>No description available.</p>
        )}
      </div>
    </>
  );
}
