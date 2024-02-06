import React,{useState, useEffect} from 'react'
import axios from 'axios'
import "./Financials.css"
const Financials = ({data,setData, stockname, findName}) => {
    useEffect(()=>{
        const fetchData = async () =>{
            fetch("http://localhost:4000/financials").then(
                resp=>resp.json()
            ).then(
                datas=>setData(datas)
            )
        }
        fetchData()
        console.log(data);
    },[stockname])
  return (
      <>
    {data.length>0?(<div className="container company-container">
      <h2 className="display-2 text-dark">{data.length>0?data[0].symbol:""}</h2>
      {/* <p><b>{data[0].securityexchangename}</b></p> */}
      <hr/>
      <h4 className="display-7">Balance Sheet</h4>
      <hr/>
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Current Assets:<b> ${data[0].assetscurrent/1000000000} Bn</b></li>
        <li class="list-group-item">Non-Current Assets:<b> ${(data[0].assets - data[0].assetscurrent)/1000000000} Bn</b></li>
        <li class="list-group-item">Total Assets: <b>${data[0].assets/1000000000} Bn </b></li>
        <li class="list-group-item">Current Liabilities: <b>${data[0].liabilitiescurrent/1000000000} Bn</b></li>
        <li class="list-group-item">Non-Current Liabilities: <b>${(data[0].liabilities - data[0].liabilitiescurrent)/1000000000} Bn</b></li>
        <li class="list-group-item">Total Liabilities: <b>${data[0].liabilities/1000000000} Bn</b></li>
        <li class="list-group-item">Shareholder's equity:<b> ${data[0].stockholdersequity/1000000000} Bn</b></li>
    </ul>
    <hr/>
    <h4 className="display-7">Income Statement</h4>
      <hr/>
      <ul class="list-group list-group-flush pb-4">
        <li class="list-group-item">Total Revenue:<b> ${data[0].revenuefromcontractwithcustomerexcludingassessedtax/1000000000} Bn</b></li>
        <li class="list-group-item">Cost of Goods Sold:<b> ${data[0].costofgoodsandservicessold/1000000000} Bn</b></li>
        <li class="list-group-item">Gross Profit: <b>${data[0].grossprofit/1000000000} Bn</b></li>
        <li class="list-group-item">Research and Development expenses: <b>${data[0].researchanddevelopmentexpense/1000000000} Bn</b></li>
        <li class="list-group-item">Selling, General, and Administrative Expenses (SG&A): <b>${data[0].sellinggeneralandadministrativeexpense/1000000000} Bn</b></li>
        <li class="list-group-item">Operating Expenses: <b>${data[0].operatingexpenses/1000000000} Bn</b></li>
        <li class="list-group-item">Operating Profit: <b>${data[0].operatingincomeloss/1000000000} Bn</b></li>
        <li class="list-group-item">Income Tax: <b>${data[0].incometaxexpensebenefit/1000000000} Bn</b></li>
        <li class="list-group-item">Net Income: <b>${data[0].netincomeloss/1000000000} Bn</b></li>
    </ul>
    
    </div>
    ):<p className="text-light display-6 text-center">Loading..</p>}
    </>
  )
}

export default Financials
