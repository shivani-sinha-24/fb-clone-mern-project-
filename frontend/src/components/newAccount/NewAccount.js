import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addLoginUserData } from "../../features/loginUserDataSlice";
import "./NewAccount.css";
import { Link, useNavigate } from "react-router-dom";
import DateOfBirth from "../dateOfBirth/DateOfBirth";
import axios from "axios";

const NewAccount = ({setIsUserFound,setIsUserLoggedin}) => {
  const dispatch = useDispatch()
  let navigate= useNavigate()
  const [user, setUser] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    date: "",
    month:"",
    year:"",
    gender:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const register = (user)=>{
    user.fName&&user.lName&&user.email&&user.password&&user.date&&user.month&&user.year&&user.gender?
    axios.post("http://localhost:3009/register",user).then(res=>{
      alert(res.data.message);
      if(res.data.user){
        // setUserData(res.data.user)
        dispatch(addLoginUserData(
          res.data.user._id,
          res.data.user.fName,
          res.data.user.lName,
          res.data.user.email,
          res.data.user.date,
          res.data.user.month,
          res.data.user.year,
          res.data.user.posts,
          res.data.user.gender
        ))
        setIsUserFound(true);
        setIsUserLoggedin(true);
        navigate("../login", { replace: true })
      }
    }):alert("Fill all the fields of the form to register")
  }
  return (
    <div>
      <div className="">
        <header className="d-flex justify-content-center p-3">
          <h1 className="title p-2">facebook</h1>
        </header>
        <main className="d-flex justify-content-center">
          <div className="col col-lg-4 d-flex justify-content-center">
            <div className="login-form container p-3">
              <h3 className="heading-new-account">Create a new account</h3>
              <p>It's quick and easy.</p>
              <hr />
              <div className="container text-center">
                <div className="row name-input">
                  <input
                    className="col m-1 form-control"
                    name="fName"
                    onChange={handleChange}
                    placeholder=" First name"
                    type="text"
                  />
                  <input
                    className="col m-1 form-control"
                    name="lName"
                    onChange={handleChange}
                    placeholder="Surname"
                    type="text"
                  />
                </div>
              </div>
              <input
                name="email"
                onChange={handleChange}
                type="email"
                className="form-control mt-2 mb-2"
                placeholder="Email address"
              />
              <input
                name="password"
                onChange={handleChange}
                type="password"
                className="form-control mt-2 mb-2"
                placeholder=" New Password"
              />
              <div className="container text-center">
                <DateOfBirth user={user} setUser={setUser}/>
              </div>
              <div className="container text-start mt-2">
              <div className="row white">
              <p className="text-start mb-1">Gender:</p>
              <div className="col mx-1 white">
                <input  type="radio" onChange={handleChange} id="male" name="gender" value="male"/>
                <label className="white"  htmlFor="male">Male</label>
                </div>
                <div className="col mx-1 white">
                <input  type="radio" onChange={handleChange} id="female" name="gender" value="female"/>
                <label className="white"  htmlFor="female">Female</label>
                    </div>
                <div className="col mx-1 white">
                <input  type="radio" onChange={handleChange} id="other" name="gender" value="other"/>
                <label className="white"  htmlFor="other">Other</label> 
                    </div>
              </div>
              </div>
              <div className="new-account btn new-account-button d-grid gap-2 mt-2 col-6 mx-auto" onClick={()=>{register(user)}}>
                  Sign Up
              </div>
              <hr />
              <div className="new-account d-grid gap-2 col-6  mx-auto justify-content-center p-3">
                <Link to="/login" className="anchor">
                  Already have an account?
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewAccount;    