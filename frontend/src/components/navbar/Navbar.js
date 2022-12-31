import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import "./navbar.css"

const Navbar = ({setIsUserLoggedin}) => {
  let navigate= useNavigate()
  const userLogout = ()=>{localStorage.clear();setIsUserLoggedin(false);navigate("../login", { replace: true })};
  return (
    <nav className="navbar navigation justify-content-center one-edge-shadow sticky" >
        <ul className="nav navigation ">
            <li className="navigation" ><Link type="button" to="/" className="nav-item btn navigation justify-content-center mx-5 navbar-brand" ><h1 className="nav-title">facebook</h1></Link> </li>
            <li className="navigation" ><Link type="button" to="/" className="nav-item btn navigation justify-content-center mx-5" ><i className="material-icons bg-white icon-size">home</i></Link> </li>
            <li className="navigation" ><Link type="button" to="/friends" className="nav-item btn navigation justify-content-center mx-5" ><i className="material-icons bg-white icon-size">people</i></Link> </li>
            <li className="navigation" ><Link type="button" to="/messages" className="nav-item btn navigation justify-content-center mx-5" ><i className="material-icons bg-white icon-size">message</i></Link> </li>
            <li className="navigation navigation dropdown">
            <div className="navigation nav-item nav-btn nav-link dropdown-toggle" to="#" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-user-circle bg-white icon-size "></i>
            </div>
            <ul className="navigation dropdown-menu">
            <li className="navigation"><Link className="navigation dropdown-item" type="button" to="/profile">View Profile</Link></li>
            <li className="navigation"><Link className="navigation dropdown-item" type="button" to="#">Settings</Link></li>
            <li className="navigation"><div className="navigation dropdown-item" onClick={userLogout} type="button" to="#">Logout</div></li>
            </ul>
        </li>
        </ul>
    </nav>
    
  )
}

export default Navbar
