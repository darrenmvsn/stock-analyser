import React from 'react'
import './ScreenerCriteria.css'
const ScreenerCriteria = ({formData}) => {
  return (
      <div className="container-fluid mb-5">
      <h2 className="display-5 mb-3">Filters shown for</h2>
      <div className=" d-flex flex-wrap justify-content-center gap-4">
        <span className="badge text-bg-dark col-lg-3 p-2">Price {"<"} ${formData.priceLowerThan}</span>
        <span className="badge text-bg-dark col-lg-3 p-2">Market Cap {">"} ${formData.marketCapMoreThan}</span>
        <span className="badge text-bg-dark col-lg-3 p-2">Dividend {">"} ${formData.dividendMoreThan}</span>
        <span className="badge text-bg-dark col-lg-3 p-2">Price {"<"} ${formData.priceLowerThan}</span>
        <span className="badge text-bg-success col-lg-3 p-2">Sector: {formData.sector}</span>
        <span className="badge text-bg-success col-lg-3 p-2">Country: {formData.country}</span>
      </div>
    </div>
  )
}

export default ScreenerCriteria
