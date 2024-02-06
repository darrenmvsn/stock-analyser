import axios from 'axios';
import React,{useState,useEffect} from 'react'
import './Screener.css'

import ScreenerCriteria from './ScreenerCriteria';
const Screener = ({ratioData, setRatioData, formData, setFormData}) => {
let doFetch = 0;
useEffect(()=>{
    const fetchData = async ()=> {
        fetch("http://localhost:4000/screener")
        .then(resp =>resp.json())
        .then(datas => setRatioData(datas))
    }
    fetchData()
    // setFormData({priceLowerThan:'', marketCapMoreThan: '', dividendMoreThan:'', sector:'', country:''});
    console.log(ratioData);
},[])

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log("before");
        doFetch = 1;
        const response = await axios.post("http://localhost:4000/screener", formData, { headers: { "Content-Type": "application/json"}})
        // setFormData({priceLowerThan:'', marketCapMoreThan: '', dividendMoreThan:'', sector:'', country:''});
        console.log(ratioData);
    } catch (error) {
        console.error(error);
    }
  };
  if (doFetch == 1) {
      console.log("fetch");
  }
// make all as an option. if all, then remove the key in the url
  return (
    <>
    {formData &&
    <form class="form-inline mb-5 filter-form">
        <label class="sr-only text-light px-3" for="inlineFormInputName2">Price Lower Than</label>
        <input type="number" name="priceLowerThan" class="form-control mb-2 mr-sm-2 w-25" id="inlineFormInputName2" placeholder="Price less than" required={true} value={formData.priceLowerThan} onChange={handleInputChange} />

        <label class="sr-only text-light px-3" for="inlineFormInputGroupUsername2">Market Cap More Than</label>    
        <input type="number" name="marketCapMoreThan" class="form-control mb-2 mr-sm-2 w-25" id="inlineFormInputName2" placeholder="Market cap of at least" required={true} value={formData.marketCapMoreThan} onChange={handleInputChange}/>
        
        <label class="sr-only text-light px-3" for="inlineFormInputName2">Dividend More Than</label>
        <input type="number" name="dividendMoreThan" class="form-control mb-2 mr-sm-2 w-25" id="inlineFormInputName2" placeholder="Dividend of at least" required={true} value={formData.dividendMoreThan} onChange={handleInputChange}/>
        
        <label class="sr-only text-light px-3" for="inlineFormInputName2">Sector</label>
        <input type="text" name="sector" class="form-control mb-2 mr-sm-2 w-25" id="inlineFormInputName2" placeholder="sector" required={true} value={formData.sector} onChange={handleInputChange}/>
        
        <label class="sr-only text-light px-3" for="inlineFormInputName2">Country</label>
        <input type="text" name="country" class="form-control mb-2 mr-sm-2 w-25" id="inlineFormInputName2" placeholder="Country" required={true} value={formData.country} onChange={handleInputChange}/>
        
        <button type="submit" class="btn btn-primary mb-2" onClick={handleSubmit}>Submit</button>
    </form>
    }
    <ScreenerCriteria formData={formData} />
    {ratioData.length > 0 ? <div className="container stocks-container">
        {console.log(ratioData)}
        {ratioData.map((comp, i)=>{return(
         <div class="card  col-md-4 col-sm-4 col-lg-3 stock-card" key={i}>
            <div class="card-header text-center">
            <b>{comp.companyName}</b>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Market Cap:<b> ${(comp.marketCap/1000000000).toFixed(1)}Bn </b></li>
                <li class="list-group-item">Last Dividend payment:<b> ${comp.lastAnnualDividend}</b></li>
                <li class="list-group-item">{comp.sector.length > 0 ? <p>Sector:<b> {comp.sector}</b></p> : <p>none</p> }</li>
                <li class="list-group-item">Stock Price:<b> ${comp.price}</b></li>
                <li class="list-group-item">Country: <b>{comp.country}</b></li>
            </ul>
       </div>
        )})}
        
    </div>
    :<p className="display-3 text-white">Loading..</p>
    }
    </>
  )
}

export default Screener
