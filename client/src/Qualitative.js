import React,{useEffect, useState} from 'react'
import { Outlet } from 'react-router';
import { Link } from 'react-router-dom';
const Qualitative = ({newsData, setNewsData,historicalData,setHistoricalData,
    companyRevData, setCompanyRevData, companyIndustry, setCompanyIndustry,
     companyGProfitData, setCompanyGProfitData, companyNetIncome,
      setCompanyNetIncome, companyEps, setCompanyEps, companyLiabilities,
       setCompanyLiabilities, companyEquity, setCompanyEquity, companyDER, setCompanyDER}) => {
    let numSen = 0;
    let totSen = 0;
    let num_years = 0;
    let total_rev = 0
    let total_gprofit = 0;
    let total_netIncome = 0;
    let total_Eps = 0;
    let total_liabilities = 0;
    let total_equity = 0;
    let revenue = [];
    let DER = [];
    var index = 0;
    let total_der = 0;
    const [numSentiment,setNumSentiment] = useState(0)
    const [totalSentiment, setTotalSentiment] = useState(0)
    const [avgSentiment, setAvgSentiment] = useState(0)
    // const [revenueData, setRevenueData] = useState([])
    const [numRevenue,setNumRevenue] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)
    const [moreInfo, setMoreInfo] = useState(false)
    const [totalGrossProfit, setTotalGrossProfit] = useState(0)
    const [totalNetIncome, setTotalNetIncome] = useState(0)
    const [totalEps, setTotalEps] = useState(0)
    const [totalDer, setTotalDer] = useState([])
    const [totalEquity, setTotalEquity] = useState(0)
    const [totalLiabilities, setTotalLiabilities] = useState(0)
    const [avgDER, setAvgDER] = useState(0)
    useEffect(()=>{
        const fetchNews = async ()=>{
            fetch("http://localhost:4000/qualitative").then(
                (resp)=>resp.json()).then(
                    (datas)=>{
                        setNewsData(datas.data)
                        setCompanyIndustry(datas.data[0].entities[0].industry)
                    }
                )
        }
        const fetchHistoricalData = async ()=>{
            fetch("http://localhost:4000/historical").then(
                (resp)=>resp.json()).then(
                    (datas)=>{
                        setHistoricalData(datas)
                        setCompanyGProfitData(Object.entries(datas.financial_data.annual.gross_profit));
                        setCompanyNetIncome(Object.entries(datas.financial_data.annual.net_income))
                        setCompanyEps(Object.entries(datas.financial_data.annual.eps_basic))
                        setCompanyLiabilities(Object.entries(datas.financial_data.annual.total_liabilities))
                        setCompanyEquity(Object.entries(datas.financial_data.annual.shareholder_equity))
                    }
                )
        }
        fetchNews()
        fetchHistoricalData()
    },[])

    useEffect(()=>{
        setNumSentiment(numSen)
        setTotalSentiment(totSen)
        let avg = totSen / numSen
        setAvgSentiment(avg)
    },[numSen, totSen])

    useEffect(()=>{
        setNumRevenue(num_years)
        setTotalRevenue(total_rev)
    },[num_years, total_rev])

    useEffect(()=>{
        
        setCompanyRevData(revenue)
        setTotalGrossProfit(total_gprofit)
        setTotalNetIncome(total_netIncome)
        setTotalEps(total_Eps)
        setTotalLiabilities(total_liabilities)
        setTotalEquity(total_equity)
        setCompanyDER(DER)
        setAvgDER(total_der/num_years)
        console.log("avg der:" , avgDER);
    },[num_years, total_rev])




  return (

    <div className="d-flex flex-column">
        {(newsData && newsData.length > 0) && <div className="">
            {/* {console.log(newsData)} */}
            <h1 className="text-light text-center mb-3">Qualitative Data for {newsData[0].entities[0].name}</h1>
            <img src={newsData[0].image_url} className="img-fluid img-thumbnail rounded w-50 " alt="img"/>
                <div className="d-flex flex-wrap flex-md-column gap-3 flex-lg-row mt-3 justify-content-center">
                    {newsData.map((news,i)=><div className="w-50 p-2 rounded text-bg-light mx-auto" key={i} >
                        
                            <h2 className="display-6 text-dark">
                                {news.title}
                            </h2>
                            <span className="badge justify-content-center bg-primary" onClick={()=>setMoreInfo(!moreInfo)} style={{ cursor: 'pointer' }}>
                                {moreInfo ? "See Less" :"Learn more"}
                            </span>
                            {(news.entities && news.entities[0].highlights) && news.entities[0].highlights.map((hlight)=>{
                                numSen++
                                totSen += hlight.sentiment;
                                
                            })}
                            {(news.entities && news.entities[0].highlights && moreInfo) && news.entities[0].highlights.map((hlight)=>{ return(
                                <p>{hlight.highlight}</p>
                                
                            )})}
                        </div>
                    )}

            </div>

            <p></p>
        </div>
        }
        <h2>The Historical Financial Performance of {historicalData !== null ? historicalData.company_info.name : "..."}</h2>
        {historicalData === null ? "NONE" : <div className="container d-flex flex-wrap gap-2">
       
        <div className="card m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Revenue
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.revenue).map((rev)=>{
                    num_years++;
                    total_rev += rev[1]
                    revenue.push(rev)
       
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.revenue).length} years: ${(totalRevenue/numRevenue).toFixed(2)}</li>}
                {numRevenue > 0 && companyRevData.map((x)=> {return (<li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}</li>)} )}
                </ul>
            </div>  
       
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Gross Profit
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.gross_profit).map((rev)=>{
                    total_gprofit += rev[1]
                    
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.gross_profit).length} years: ${(totalGrossProfit/numRevenue).toFixed(2)}</li>}
                {companyGProfitData.length > 0 && companyGProfitData.map((x)=>{return (
                <li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}
                </li>)} )
                    
                }
                {/* {numRevenue > 0 && revenueData.map((x)=> {return (<li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}</li>)} )} */}
                </ul>
            </div> 
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Net Income
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.net_income).map((rev)=>{
                    total_netIncome += rev[1]
  
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.net_income).length} years: ${(totalNetIncome/numRevenue).toFixed(2)}</li>}
                {companyNetIncome.length > 0 && companyNetIncome.map((x)=>{return (
                <li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}
                </li>)} )
                    
                }
                </ul>
            </div> 
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Earnings per share
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.eps_basic).map((rev)=>{
                    total_Eps += rev[1]
     
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.eps_basic).length} years: ${(totalEps/numRevenue).toFixed(2)}</li>}
                {Object.entries(historicalData.financial_data.annual.eps_basic).map((x)=>{return (
                <li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}
                </li>)} )
                    
                }
                </ul>
            </div>  
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Total Liabilities
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.total_liabilities).map((rev)=>{
                    total_liabilities += rev[1]
                    DER.push([rev[0],rev[1]])
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.total_liabilities).length} years: ${(totalLiabilities/numRevenue).toFixed(2)}</li>}
                {Object.entries(historicalData.financial_data.annual.total_liabilities).map((x)=>{return (
                <li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}
                </li>)} )
                    
                }
                </ul>
            </div> 
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Total Equity
                </div>
                <ul className="list-group list-group-flush">
                {Object.entries(historicalData.financial_data.annual.shareholder_equity).map((rev)=>{
                    total_equity += rev[1]
                    // console.log(index, DER[index]);
                    DER[index][1] = (DER[index][1]/ rev[1])
                    index++
                    if (index == DER.length) {
                        index--;
                    }
                })}
                {numRevenue > 0 && <li className="list-group-item bg-black text-white">AVG OVER {Object.entries(historicalData.financial_data.annual.shareholder_equity).length} years: ${(totalEquity/numRevenue).toFixed(2)}</li>}
                {Object.entries(historicalData.financial_data.annual.shareholder_equity).map((x)=>{return (
                <li className="list-group-item bg-black text-white"> <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{x[0]}:</span>  ${x[1]}
                </li>)} )
                    
                }
                </ul>
            </div>  
            <div className="card  m-auto h-50 col-lg-5 col-sm-4">
                <div className="card-header">
                    Debt to Equity Ratio
                </div>
                {companyDER.length > 0 && companyDER.map((val)=>{
                    total_der += val[1];
                    console.log("total ", total_der);
                })}
                <ul className="list-group list-group-flush">
                    {/* {total_der = companyDER.reduce((x,y)=>x+y,0)} */}
                    {companyDER.length > 0 && <li className="list-group-item bg-black text-white">AVG OVER {companyDER.length} years: {avgDER.toFixed(2)}</li>}
                    {companyDER.length > 0 && companyDER.map((arr)=>{return(
                        <li className="list-group-item bg-black text-white"> 
                        <span className="badge rounded-pill bg-dark-subtle text-black p-2 mr-2">{arr[0]}:</span>  
                        {arr[1].toFixed(2)}
                        </li>
                    )})}
                </ul>
            </div>
                
            </div>
        
        }
        <Link to="analysis" style={{textDecoration:'none'}} className="m-auto mt-4">
            {companyDER.length > 0 && <span className="badge bg-secondary p-3 text-xl-center">Analyze</span>}
        </Link>  
    <Outlet/>
    </div>
  )
}
export default Qualitative
