import React from 'react'
import "./Homepage.css";
import {Outlet} from "react-router-dom";
import Navbar from '../navbar/Navbar';

const Homepage = ({setIsUserLoggedin}) => {
  
  return (
    <div>
      <div>
        <div>
          <Navbar setIsUserLoggedin={setIsUserLoggedin}/>
        </div>
      <div className='main-content'>
      <Outlet/>
      </div>
    </div>
    </div>
  )
}

export default Homepage
