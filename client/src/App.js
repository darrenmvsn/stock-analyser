import Navbar from './Navbar';
import './App.css';
import Main from './Main';
import Features from './Features'
import Footer from './Footer';
import Financials from './Financials';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate} from 'react-router-dom';
import React,{useState, useEffect} from 'react';
import SignUp from './SignUp';
import SignIn from './SignIn';
import Screener from './Screener';
import Qualitative from './Qualitative';
import Analysis from './Analysis';
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [data,setData] = useState([]);
  const [ratioData,setRatioData] = useState([]);
  const [newsData,setNewsData] = useState([]);
  const [historicalData,setHistoricalData] = useState(null);
  const [formData, setFormData] = useState({priceLowerThan:'', marketCapMoreThan: '', dividendMoreThan:'', sector:'', country:''});
  const [companyRevData, setCompanyRevData] = useState([]);
  const [companyGProfitData, setCompanyGProfitData] = useState([]);
  const [companyIndustry, setCompanyIndustry] = useState('');
  const [companyNetIncome, setCompanyNetIncome] = useState([]);
  const [companyEps, setCompanyEps] = useState([]);
  const [companyLiabilities, setCompanyLiabilities] = useState([]);
  const [companyEquity, setCompanyEquity] = useState([]);
  const [companyDER, setCompanyDER] = useState([]);
  const [stockname, setStockname] = useState("");
  const [findName, setFindName] =useState(false);
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
  
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [logged, setLogged] = useState()
  useEffect(()=>{
    navigate("/sign-in");
  },[])
  useEffect(() => {
    
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/sign-in");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, email } = data;
      console.log(data);
      // setUsername(email);
      // setLogged(status)
      return status
        ? toast(`Hello ${email}`, {
            position: "top-right",
          })
        : (removeCookie("token"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/sign-up");
  };
  return (
    <div>
     {logged && <Navbar data={data} setData={setData} stockname={stockname} setStockname={setStockname} findName={findName} setFindName={setFindName} />}
      <Routes>
        <Route path="/sign-up" element={<SignUp setLogged={setLogged} setUsername={setUsername}/>} />
        <Route path="/sign-in" element={<SignIn setLogged={setLogged} setUsername={setUsername}/>} />
        <Route path="/" element={<Main username={username}/>} />
        <Route path="/screener" element={<Screener ratioData={ratioData} setRatioData={setRatioData} formData={formData} setFormData={setFormData}/>} />
        <Route path="/" element={<Features/>} />
        <Route path="/qualitative" element={
          <Qualitative newsData = {newsData} 
            setNewsData = {setNewsData} 
            historicalData = {historicalData} 
            setHistoricalData = {setHistoricalData} 
            companyRevData = {companyRevData}
            setCompanyRevData = {setCompanyRevData}
            companyIndustry = {companyIndustry}
            setCompanyIndustry = {setCompanyIndustry}
            companyGProfitData = {companyGProfitData}
            setCompanyGProfitData = {setCompanyGProfitData}
            companyNetIncome = {companyNetIncome}
            setCompanyNetIncome = {setCompanyNetIncome}
            companyEps = {companyEps}
            setCompanyEps = {setCompanyEps}
            companyLiabilities = {companyLiabilities}
            setCompanyLiabilities = {setCompanyLiabilities}
            companyEquity = {companyEquity}
            setCompanyEquity = {setCompanyEquity}
            companyDER = {companyDER}
            setCompanyDER = {setCompanyDER}
          />
          } > 
        </Route>

        <Route path="/qualitative/analysis" element={<Analysis companyRevData={companyRevData} companyIndustry={companyIndustry} companyGProfitData={companyGProfitData} companyNetIncome={companyNetIncome} companyEps={companyEps} companyLiabilities={companyLiabilities} companyEquity={companyEquity} companyDER={companyDER} historicalData={historicalData} />} />
        {/* <Route path="/qualitative/:Id" element={<Analysis />} /> */}
        <Route path="/financials" element={<Financials data={data} setData={setData} stockname={stockname} findName={findName} />} />
      </Routes>
      <Footer/>
      {/* <Main/> */}
      {/* <Features/> */}
      {/* <Footer/> */}
      <ToastContainer />
    </div>
  );
}

export default App;
