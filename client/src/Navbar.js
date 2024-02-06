import React,{useState} from 'react'
import "./nav.css"
import axios from 'axios'
import { Link } from 'react-router-dom'
const Navbar = ({stockname, setStockname, findName, setFindName}) => {
    // const [stockname, setStockname] = useState("")
    const [home, setHome] = useState(false)
    
    const handleChange = (e) =>{
        setStockname(e.target.value)
    }
    const handleSubmit = async (e) => {
        // e.preventDefault();
        try{
            const response = await axios.post("http://localhost:4000/financials", {name:stockname},{ headers: { "Content-Type": "application/json" } })
            // let screen = await axios.post("http://localhost:3002/screener", {name:stockname},{ headers: { "Content-Type": "application/json" } })
            setStockname("")
            setFindName(!findName)
        } catch (err) {
            console.error("Error sending data to the backend")
        }
    }
  return (
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark mb-5 p-2" aria-label="Third navbar example">
    <div class="container-fluid">
     <Link to="/" onClick={()=>setHome(false)} >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16" >
             <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
        </svg>
     </Link>
      <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample03" aria-controls="navbarsExample03" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="navbar-collapse collapse" id="navbarsExample03">
        <ul class="navbar-nav me-auto mb-2 mb-sm-0 nav-links mx-3">
          <li class="nav-item">
          <Link to="/qualitative" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(true)}> <li>Qualitative</li></Link>
          </li>
          <li class="nav-item">
          <Link to="/screener" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(false)}> <li>Screener</li></Link>    
          </li>
          <li class="nav-item">
          <Link to="/financials" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(true)}> <li>Financials</li></Link>
          </li>
          {/* <li class="nav-item">
          <Link to="/sign-up" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(false)}> <li>Sign Up</li></Link>
          </li> */}
          {/* <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li> */}
        </ul>
        {home?<form className=" position-absolute top-0 end-0 form-search col-lg-4 col-md-4">
          <input type="text" value={stockname} class="form-control w-50" placeholder="Company Name" aria-describedby="button-addon2" onChange={handleChange}/>
          <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}>Search</button>
          </form>:
        <></>}
      </div>
    </div>
  </nav>
    // <div className="nav">
    //   <ul className="nav-links col-lg-6 col-md-8 ">
    // <Link to="/" onClick={()=>setHome(false)}>
    //     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
    //         <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
    //     </svg>
    // </Link>
     
        
    //     <Link to="/qualitative" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(true)}> <li>Qualitative</li></Link>
    //     <Link to="/screener" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(false)}> <li>Screener</li></Link>    
    //     <Link to="/financials" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(true)}> <li>Financials</li></Link>
    //     <Link to="/sign-up" style={{color:"white", textDecoration:"none"}} onClick={()=>setHome(false)}> <li>Sign Up</li></Link>
    //   </ul>
    //   <div className="burger-menu">
    //     <div></div>
    //     <div></div>
    //   </div>
    // {home?<div className="position-absolute top-0 end-0 form-search col-lg-4 col-md-4">
    // <input type="text" value={stockname} class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2" onChange={handleChange}/>
    // <button class="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSubmit}>Button</button>
    // </div>:
    // <></>}
    // </div>
  )
}

export default Navbar
