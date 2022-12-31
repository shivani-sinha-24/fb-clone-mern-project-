import React, { useState } from 'react';
import "./Login.css"
import axios from 'axios';
import {Link, useNavigate } from "react-router-dom";

const Login = ({setIsUserLoggedin,setUserData}) => {
  let navigate =useNavigate();

  const[user,setUser]=useState({
    email:'',
    password:""
  })

  const handleChange = e =>{
    const {name,value} = e.target;  
    setUser({...user,[name]:value})
  }

  const login = (user)=>{
    user.email&&user.password?
    axios.post("http://localhost:3009/login",user).then(res=>{
      if(res.status===201){
        alert(res.data.message);
        localStorage.setItem("fbUser",JSON.stringify(res.data.user))
        setUserData(res.data.user)
        setIsUserLoggedin(JSON.parse(localStorage.getItem("fbUser")?true:false))
        navigate("../", { replace: true })
      }else{
        alert(res.data.err);
      }
    }):alert("Fill all the fields of the form to register")
  }

  return (
    <div>
      <div className="login row d-flex justify-content-center flex-row mb-3 container text-center align-content-center">
      <div className="col col-lg-5 px-5 py-2 mx-5 my-2 text-start">
        <h1 className="title">facebook</h1>
        <p className="paragraph">
          Facebook helps you connect and share with the people in your life.
        </p>
      </div>
      <div className="col col-lg-5 px-5 py-2 mx-5 my-2 text-center">
        <div className="login-form container p-3">
          <input
            name="email"
            type="email"
            className="form-control mt-2 mb-3"
            placeholder="Email address"
            value={user.email}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            className="form-control mt-2 mb-3"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
          />
          <div className="d-grid gap-2 btn btn-primary" onClick={()=>{login(user)}}>
            Log in
          </div>
          <hr />
          <div className="new-account d-grid gap-2 col-6 mx-auto">
            <Link
              to="/new-account"
              type="button"
              className="btn new-account-button"
            >
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
