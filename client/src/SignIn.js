import React, {useState} from 'react'
import axios from 'axios'
import "./SignUp.css"
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
const SignIn = ({setLogged, setUsername}) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [accountDetails, setAccountDetails] = useState()

    // const handleError = (err) =>
    //     toast.error(err, {
    //     position: "bottom-left",
    // });

    const handleSuccess = (msg) => {
        setLogged(true)
        // setInterval(()=>toast.success(msg, {
        //     position: "bottom-right",
        //     }), 1000)
};
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setAccountDetails({
                email: email,
                password: password
            })
            const {data} = await axios.post("http://localhost:4000/sign-in", {
                email: email,
                password: password
            }, {withCredentials: true})
            const {success, message} = data
            if (success) {
                setLogged(true)
                setUsername(email.split("@")[0])
                setTimeout(() => {
                navigate("/");
                }, 1000);
            } else {
                alert(message);
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div className="signup">
    <main className="form-signin w-50 m-auto">
        
        <form type="submit" onSubmit={handleSubmit} >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-boxes" viewBox="0 0 16 16">
            <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z"/>
        </svg>
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <div class="form-floating">
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" class="form-control" id="floatingPassword" placeholder="Password"/ >
                <label for="floatingPassword">Password</label>
            </div>
            <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
                <Link to="/sign-up"><a className="mx-3">Don't have an account?</a></Link>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="mt-2 mb-3 text-body-primary">© 2017–2023</p>
        </form>
        <ToastContainer/>
    </main>
    </div>
  )
}

export default SignIn
