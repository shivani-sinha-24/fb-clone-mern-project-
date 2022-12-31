import { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';

import "./App.css";

import Login from "./components/login/Login";
import NewAccount from "./components/newAccount/NewAccount";
import Homepage from "./components/homepage/Homepage";
import Profile from "./components/profile/Profile";
import Messages from "./components/messages/Messages";
import Friends from "./components/friends/Friends";
import Newsfeed from "./components/newsfeed/Newsfeed";

function App() {

  const [userData, setUserData] = useState({});
  const [isUserFound, setIsUserFound] = useState(false);
  const [isUserLoggedin, setIsUserLoggedin] = useState(false);  
  const [isNewPost, setIsNewPost] = useState(false);
  const [reload, setReload] = useState(false);
  const [feedPosts, setFeedPosts] = useState([]);

  const LSUser = JSON.parse(localStorage.getItem("fbUser"));

  useEffect(()=>{
    if(LSUser){axios.get(`http://localhost:3009/${LSUser?._id}`,LSUser?._id).then(res=>{
      setUserData(res.data._doc)
      setIsUserLoggedin(true)
    })

      axios.get(`http://localhost:3009/users-posts/${userData._id}`).then((res) => {
        setFeedPosts(res.data);
      });

    }else{
      setIsUserLoggedin(false)
    }
  },[reload, isNewPost])
  
  return (
    <BrowserRouter>
      <Routes>
          <Route
            path="login"
            element={
              <Login
                isUserLoggedin={isUserLoggedin}
                isUserFound={isUserFound}
                setIsUserFound={setIsUserFound}
                setIsUserLoggedin={setIsUserLoggedin}
                setUserData={setUserData}
              />
            }
          />
          <Route
            path="new-account"
            element={
              <NewAccount
                isUserFound={isUserFound}
                isUserLoggedin={isUserLoggedin}
                setIsUserFound={setIsUserFound}
                setIsUserLoggedin={setIsUserLoggedin}
                setUserData={setUserData}
              />
            }
          />
          <Route path="/"element={
              // isUserFound && 
              isUserLoggedin? (
              <Homepage
              setIsUserLoggedin={setIsUserLoggedin}
              />
            ):<Login
                isUserLoggedin={isUserLoggedin}
                isUserFound={isUserFound}
                setIsUserFound={setIsUserFound}
                setIsUserLoggedin={setIsUserLoggedin}
                setUserData={setUserData}
              />}
          >
            <Route path="/" element={<Newsfeed 
              userData={userData}
              setUserData={setUserData}
              isUserLoggedin={isUserLoggedin}
              isNewPost={isNewPost}
              setIsNewPost={setIsNewPost}
              feedPosts={feedPosts}
              setFeedPosts={setFeedPosts}
              reload={reload}
              setReload={setReload}
              id={userData?._id}/>}
            />
            <Route path="profile" element={<Profile
              userData={userData}
              setUserData={setUserData}
              isUserLoggedin={isUserLoggedin}
              id={userData?._id}/>}
            />
            <Route path="messages" element={<Messages/>}/>
            <Route path="friends" element={<Friends/>}></Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// passing props in components should be organised
//create 2 browser routers on the basis of login state
//if not login  ---  new account,  login in
// if login  ---  homepage

