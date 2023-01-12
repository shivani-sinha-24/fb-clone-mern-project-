import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import "./Post.css" ;
import Comments from "../comments/Comments";

const Post = ({ caption,  image,  date,  postId,  setReload,  comments }) => {
  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  const [comntInput, setCmntTnput] = useState("");
  const [showCmnt, setShowCmnt] = useState(false);
  const[isPostLiked,setIsPostLikedd]= useState(false)
  const postdetail = {
    userId:userProfileData._id,
    userName:userProfileData.fName+" "+userProfileData.lName,
    postId,
    comntInput,
  };

  useEffect(()=>{
    axios.post(`http://localhost:3009/post-liked`,postdetail).then(res=>{
      setIsPostLikedd(true)
    })
  },[])

  const deletePost = () => {
    setReload(false);
    axios.post(`http://localhost:3009/delete-post`, postdetail).then((res) => {
      setReload(true);
    });
  };

  const addCmnt = () => {
    setReload(false);
    if (comntInput) {
      axios
        .post(`http://localhost:3009/add-comment`, postdetail)
        .then((res) => {
          setReload(true);
          setCmntTnput("");
        });
    }
  };
  
  const likePost=()=>{
    axios.post(`http://localhost:3009/add-like`,postdetail).then(res=>{
      setIsPostLikedd(true)
      setReload(true);
    })
  }

  const dislikePost = ()=>{
    axios.post(`http://localhost:3009/remove-like`,postdetail).then(res=>{
      setIsPostLikedd(false)
      setReload(true);
    })
  }

  return (
    <div className=" my-2 bg-white">
      <div className="row m-1 bg-white">
        <div className="col-11 bg-white text-start">
          {caption && (
            <div className="card-title bg-white">
              <b className="bg-white">{caption}</b>
            </div>
          )}
        </div>
        <div
          className="col-1 btn bg-white text-end"
          onClick={() => {
            deletePost();
          }}
        >
          &#x2715;
        </div>
      </div>
      {image && (
        <img
          src={`http://localhost:3009/uploads/${image}`}
          className="card-img-top bg-white p-2"
          alt={image}
        />
      )}
      <div className="row m-1">
        <i className="col btn bg-white text-center fa like-btn" style={isPostLiked?{color:"blue"}:{color:"black"}} onClick={()=>{isPostLiked?dislikePost():likePost()}}>&#xf087;</i>
        <div type="button" className="col btn bg-white text-center" onClick={() => { setShowCmnt(!showCmnt) }} >
          comment
        </div>
        <hr className="bg-white m-0" />
        {showCmnt &&
        comments.length > 0 &&
        comments.map((comment,index) => {
          return (
            <Comments cmnt={comment.cmnt} key={index} id={index} postId={postId}setReload={setReload} />
          );
        })}
        <form
          className="bg-white row"
          onSubmit={() => {
            addCmnt();
          }}
        >
          <div className="col-11 mt-2 bg-white">
            <input
              name="searchusertext"
              type="search"
              className="form-control px-3 "
              placeholder="Add comments...."
              onChange={(e) => {
                setCmntTnput(e.target.value);
              }}
              value={comntInput}
              style={{ border: "none", background: "#f2eaea" }}
            />
          </div>
          <div
            className="col-1 mt-2 bg-white p-0 text-starrt"
            onClick={(e) => {
              e.preventDefault();
              addCmnt();
            }}
          >
            <button className="btn fa">&#xf1d9;</button>
          </div>
        </form>
      </div>
      {date && <p className="card-text bg-white m-2">{date}</p>}
    </div>
  );
};

export default Post;
