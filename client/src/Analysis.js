import React,{useEffect, useState} from 'react'
import axios from 'axios';
const Analysis = ({
    companyRevData,
    companyIndustry,
    companyGProfitData,
    companyNetIncome,
    companyEps,
    companyLiabilities,
    companyEquity,
    companyDER,
    historicalData
}) => {
// Criterias : Sentiment value, EPS Growth, DER, Revenue, Profitability, Net Income
/**
 SECTOR PERFORMANCE: https://financialmodelingprep.com/api/v3/sectors-performance?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL
Ratings for each value : 0-3
DCF: https://financialmodelingprep.com/api/v3/discounted-cash-flow/AAPL?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL
Recommended: https://financialmodelingprep.com/api/v3/historical-rating/AAPL?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL
 */
const [epsRating, setEpsRating] = useState(0);
// const [companyName, setCompanyName]
const [revRating, setRevRating] = useState(0);
const [derRating, setDerRating] = useState(0);
const [profitabilityRating, setProfitabilityRating] = useState(0)
const [dcfAnalysis, setDcfAnalysis] = useState([])
const [companyRating, setCompanyRating] = useState()
const [recommendations, setRecommendations] = useState([])
const [recommendationScore, setRecommendationScore] = useState(0)
 const get_sector_avg = async (industry) => {
    try {
        const response = await fetch(`https://financialmodelingprep.com/api/v3/sectors-performance?apikey=A1dOsl0ugaT1uVHZadDHIhVNiocDcIyL`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const filteredArray = data.filter((sectArr) => sectArr.sector === industry);

        return filteredArray;
    } catch (error) {
        // Handle errors here
        console.error('Error in get_sector_avg:', error);
        throw error; // You might want to throw the error again to propagate it
    }
};


const EPS_Growth = (eps_arr, industry) => {
    let len = eps_arr.length
    const INFLATION_RATE = 2.22
    // find the EPS growth from this year and last year.
    // find overall growth from first year til now
    // find avg growth per year
    // compare the average past year growth to the sector's growth
    try{
        let CAGR = (eps_arr[len - 1][1]/ eps_arr[0][1])^(1/len) - 1
        let pastYearGrowth = ( (eps_arr[len - 1][1] - eps_arr[len - 2][1]) / eps_arr[len - 2][1] ) * 100
        let overallGrowth = ( (eps_arr[len-1][1] - eps_arr[0][1]) / eps_arr[0][1] ) * 100
        get_sector_avg(industry).then(
            result => {
                if (CAGR > INFLATION_RATE && pastYearGrowth > parseFloat(result[0].changesPercentage) && overallGrowth >= 10) {
                    setEpsRating(3)
                }
                else if ((CAGR > INFLATION_RATE && pastYearGrowth > parseFloat(result[0].changesPercentage) && overallGrowth >= 10) ||
                (!(CAGR > INFLATION_RATE) && pastYearGrowth > parseFloat(result[0].changesPercentage) && overallGrowth >= 10) ||
                (CAGR > INFLATION_RATE && !(pastYearGrowth > parseFloat(result[0].changesPercentage)) && overallGrowth >= 10) ||
                (CAGR > INFLATION_RATE && pastYearGrowth > parseFloat(result[0].changesPercentage) && !(overallGrowth >= 10))) {
                    setEpsRating(2)
                }
                else {
                    const conditionsNotMet = (CAGR <= INFLATION_RATE) + !(pastYearGrowth > parseFloat(result[0].changesPercentage)) + !(overallGrowth >= 10);
                
                    if (conditionsNotMet === 2) {
                        setEpsRating(1);
                    } else {
                        setEpsRating(0)
                        
                    }
                }
            }
        )
    } catch(err){
        console.error(err);
    }
}
const rev_growth = (revenue_arr) => {
    let len = revenue_arr.length
    let CAGR = ((revenue_arr[len - 1][1]/ revenue_arr[0][1])^(1/len) - 1 ) * 100
    let pastYearGrowth = ( (revenue_arr[len - 1][1] - revenue_arr[len - 2][1]) / revenue_arr[len - 2][1] ) * 100
    let overallGrowth = ( (revenue_arr[len-1][1] - revenue_arr[0][1]) / revenue_arr[0][1] ) * 100
    if (pastYearGrowth >= CAGR && overallGrowth > 100 && CAGR >= 10) {
        setRevRating(3)
    }
    else if (pastYearGrowth >= CAGR && overallGrowth > 60 && CAGR >= 7) {
        setRevRating(2)
    }
    else if (pastYearGrowth >= CAGR && overallGrowth > 40 && CAGR >= 4) {
        setRevRating(1)
    }
    else {
        setRevRating(0)
    }
}

const DER_Analysis = (DER_arr) => {
    let total_iterations = DER_arr.length - 1;
    let avgYtoYGrowth = 0;
    for (let i = 0;i < total_iterations;i++) {
        avgYtoYGrowth += ((DER_arr[i + 1][1] - DER_arr[i][1])/DER_arr[i][1]) * 100
    }
    avgYtoYGrowth = avgYtoYGrowth / total_iterations

    let YtoYGrowth = ((DER_arr[total_iterations][1] - DER_arr[total_iterations - 1][1])/DER_arr[total_iterations - 1][1]) * 100;
    if (YtoYGrowth <= avgYtoYGrowth && avgYtoYGrowth < 3) {
        setDerRating(3)
    }
    else if (YtoYGrowth <= avgYtoYGrowth && avgYtoYGrowth < 7) {
        setDerRating(2)
    }
    else if (YtoYGrowth >= avgYtoYGrowth && avgYtoYGrowth < 7) {
        setDerRating(1)
    }
    else {
        setDerRating(0)
    }
}

const profit_growth = (profit_arr) => {
    let len = profit_arr.length 
    let CAGR = ((profit_arr[len - 1][1]/ profit_arr[0][1])^(1/len) - 1 ) * 100
    let pastYearGrowth = ( (profit_arr[len - 1][1] - profit_arr[len - 2][1]) / profit_arr[len - 2][1] ) * 100
    let overallGrowth = ( (profit_arr[len-1][1] - profit_arr[0][1]) / profit_arr[0][1] ) * 100
    if (pastYearGrowth >= CAGR && overallGrowth > 100 && CAGR >= 40) {
        setProfitabilityRating(3)
    }
    else if (pastYearGrowth >= CAGR && overallGrowth > 50 && CAGR >= 20) {
        setProfitabilityRating(2)
    }
    else if (pastYearGrowth >= CAGR && overallGrowth > 30 && CAGR >= 10) {
        setProfitabilityRating(1)
    }
    else {
        setProfitabilityRating(0)
    }
};
const analyse_data = (companyRevData,
    companyIndustry,
    companyGProfitData,
    companyNetIncome,
    companyEps,
    companyLiabilities,
    companyEquity,
    companyDER) => {

    profit_growth(companyGProfitData)
    DER_Analysis(companyDER)
    rev_growth(companyRevData)
    EPS_Growth(companyEps, companyIndustry)
    const totalScore = profitabilityRating + derRating + revRating + epsRating
    let percentage_score = totalScore/12 * 100
    console.log("analyze:", percentage_score )
    setCompanyRating(percentage_score)
}

const recommender_system = (recommendations) => {
    let total_rating = 0
    recommendations.slice(365).map((val)=> total_rating+=val.ratingScore)
    total_rating = total_rating / 366
    setRecommendationScore(total_rating)
}

useEffect(()=>{
    const fetchDCFResults = async () => {
        const response = await axios.get("http://localhost:4000/DCF")
        const result = await response.data
        setDcfAnalysis(result)
    }
    const fetchRecommendations = async () => {
        const resp = await axios.get("http://localhost:4000/recommendations")
        const result = await resp.data
        setRecommendations(result)
    }
    
    try {
        analyse_data(companyRevData,
            companyIndustry,
            companyGProfitData,
            companyNetIncome,
            companyEps,
            companyLiabilities,
            companyEquity,
            companyDER)
        fetchRecommendations()
        fetchDCFResults()
        
    } catch (error) {
        console.error(error);
    }
   
},[])
useEffect(()=>{
    recommender_system(recommendations)
},[recommendations])
  return (
      <>
      {(recommendations.length > 0 && dcfAnalysis.length > 0 )&& <>
        <h2 className="display-2 text-white">THE ANALYSIS</h2>
        <div class="row row-cols-1 row-cols-md-2 g-4 w-75 m-auto">
        <div class="col">
        <div class="card">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
            <h5 class="card-title">DCF Analysis</h5>
            <p class="card-text">A valuation method used to estimate the value of an investment based on its expected future cash flows. The fundamental principle behind DCF analysis is that the value of money today is worth more than the same amount in the future, due to the opportunity to invest and earn a return.</p>
            {dcfAnalysis.length > 0 ? <div className="container-fluid">
                <h3 class="card-text">RESULTS:</h3>
                <div className={(dcfAnalysis[0].dcf < dcfAnalysis[0]["Stock Price"]) ? "bg-info p-2" : "bg-danger p-2"}>
                    DCF estimated value: <strong>${dcfAnalysis[0].dcf.toFixed(2)}</strong>
                    <div className="bg-info">
                        Actual value : <strong>${dcfAnalysis[0]["Stock Price"]}</strong>
                    </div>
                </div>
            </div>      
            :<>{companyIndustry === ""?<h2 className="bg-danger p-2">No Company Selected</h2>:<h2 className="bg-danger p-2 ">Data Unavailable for this company</h2>}</>    
            }
            </div>
        </div>
        </div>

        <div class="col">
        <div class="card p-2">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
            <h5 class="card-title">Financial Data Analysis Results</h5>
            <p class="card-text ">Our algorithm processes diverse datasets, including revenue, expenses, profit margins, cash flows, and more. Users can input historical and real-time financial data, enabling the algorithm to generate interactive dashboards, trend analyses, and predictive models. Key functionalities include benchmarking against industry standards, identifying potential risks and opportunities, and optimizing financial strategies. With user-friendly interfaces and customizable parameters, our financial data analysis algorithm empowers users to make informed decisions, enhance financial performance, and drive business growth.</p>
            </div>
            {companyRating && <>
                <div className="card-body center mb-2 m-auto">
                    <h4 className="text-dark-emphasis text-center mb-4">Results for this company:</h4>
                    <span className={companyRating <= 50 ? "alert alert-danger p-3 mb-4" : "alert alert-info p-2 mb-4"}>Score: {companyRating.toFixed(2)}/100</span>
                    
                </div>
                <div className={companyRating <= 50 ? "alert alert-danger p-3 mb-4" : "alert alert-info p-2 mb-4"}>
                <h4 className="text-body-emphasis ">{companyRating <= 50 ? "High risk due to poor performance" : "Moderately low risk with high potential of growth"}</h4>
                </div>
                
            </>
            }
            
        </div>
        </div>
        <div class="col m-auto">
        <div class="card bg">
            <img src="..." class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">Recommender System results</h5>
                <p class="card-text">The recommender system for stocks utilizes ratings and insights from professional analysts who conduct comprehensive evaluations of various stocks based on fundamental and technical analysis, industry trends, financial performance, and market dynamics. By aggregating and analyzing analysts' ratings, the system offers investors valuable recommendations and insights to guide their investment decisions</p>

            </div>
            {recommendations.length > 0 && <div className="card-body">
                {recommendationScore > 80 && <p className="alert alert-success">This company has exhibited outstanding performance driven by robust revenue growth, innovative product offerings, strong market positioning, and effective execution of strategic initiatives.
                    This analysis provides an in-depth evaluation of {historicalData.company_info.name}'s financial performance, competitive positioning, growth prospects, and investment attractiveness based on comprehensive research and expert analysis </p>}
                {(recommendationScore >= 50 && recommendationScore <= 80) && <p className="alert alert-info">
                    A reputable player in the {companyIndustry} sector, presents a medium-performing investment opportunity characterized by steady revenue growth, moderate profitability, competitive positioning, and growth prospects. This analysis offers a comprehensive assessment of {historicalData.company_info.name} financial performance, competitive landscape, growth potential, and investment considerations based on diligent research and expert analysis.
                    </p>}
                {(recommendationScore < 50) && <p className="alert alert-danger">
                {historicalData.company_info.name}, a struggling entity in the {companyIndustry} sector, presents a challenging investment landscape characterized by declining revenue, deteriorating profitability, competitive challenges, and uncertain growth prospects. This analysis provides a comprehensive evaluation of ABC Retail's financial performance, competitive positioning, operational challenges, and investment considerations based on rigorous research and expert analysis.
                </p>}   
            </div>}
        </div>
        </div>

    </div>
</>
}
  </>
  )
}

export default Analysis
