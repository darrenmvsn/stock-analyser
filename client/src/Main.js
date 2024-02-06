import React from 'react'
import "./main.css"
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
const Main = ({username}) => {
//     const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//       }
//       const { data } = await axios.post(
//         "http://localhost:4000",
//         {},
//         { withCredentials: true }
//       );
//       const { status, user } = data;
//       setUsername(user);
//       return status
//         ? toast(`Hello ${user}`, {
//             position: "top-right",
//           })
//         : (removeCookie("token"), navigate("/login"));
//     };
//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   const Logout = () => {
//     removeCookie("token");
//     navigate("/signup");
//   };
  return (
      <>
      <h1 className="text-white text-center display-2 alert alert-heading text-capitalize">Welcome, {username}</h1>
    <div className="container main-container">
        {/* <div className="row"> */}
        
            <img className="img-fluid main-img col-md-6 col-sm-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI7hgQFxp4mysM5DgxqP7InBk5H9asXOeJ1Q&usqp=CAU" alt="pic"/>
            <p className="col-md-6 col-sm-12">Empower your financial journey with our app, the ultimate stock market companion. 
            Whether you're a seasoned investor or just getting started, our platform provides the tools and insights you need to make informed decisions and achieve your financial goals.
            </p>
    </div>
    <div className="container button-container">
        <button type="button" className="px-2 mx-2 btn btn-primary col-md-6 col-sm-12 col-lg-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-apple" viewBox="0 0 16 16">
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"></path>
            <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43Zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282Z"></path>
            </svg>
            Download
        </button>
        <button type="button" className="px-2 mx-2 btn btn-primary col-md-6 col-sm-12 col-lg-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google-play" viewBox="0 0 16 16">
            <path d="M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96 2.694-1.586Zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055l7.294-4.295M1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27Z"></path>
            </svg>
            Download
        </button>
    </div>
    <div className="container mission-container">
        <h3 className="display-3">A vision and a dream.</h3>
        <img className="img-fluid founder-img col-md-4 col-sm-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRizuFSTrkx8H9VDrjbZ9NI-yfzZCE-fcPrnQ&usqp=CAU" alt="founder" />
        <ul className="visions col-md-6 col-sm-12">
            <li>
            We envision a world where everyone, regardless of their financial background, can achieve true financial independence. 
            Our app is founded on the belief that access to powerful financial tools and insights should be seamless, empowering individuals to take control of their financial destinies.
            </li>
            <li>
            Our mission is to democratize financial knowledge. We strive to break down complex financial concepts and make them accessible to all users, from seasoned investors to those taking their first steps into the world of stocks. 
            By providing clear, concise information, we empower our users to make informed decisions.
            </li>
            <li>
            We aim to be the trusted companion on every investor's journey. [Your App Name] is more than a platform; it's a guide that empowers users to navigate the stock markets with confidence. We believe that understanding the markets should not be reserved for a select few but should be within reach for anyone aspiring to 
            build wealth through strategic investments.
            </li>
        </ul>
    </div>

    </>
  )
}

export default Main
