import React from "react";
import { useSelector } from "react-redux";

import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";

const Newsfeed = ({ id, isNewPost,setIsNewPost, setReload}) => {
  const newsFeedPosts = useSelector(state=>state.allUsersPostReducer)
  const userProfileData = useSelector(state=>state.loginUserDataReducer)
  
  const LSUser = JSON.parse(localStorage.getItem("fbUser"));
  
  return (
    <div>
      <div className="container bg-white justify-content-center my-3 p-3 border-style">
        <div className="row bg-white d-flex justify-content-around">
          <div className="col-md-1 bg-white">
            <i className="fa fa-user-circle bg-white icon-size "></i>
          </div>
          <div className="col-md-10 bg-white">
            <input
              type="text"
              className="caption form-control bg-grey"
              placeholder={"Whats on your mind, " + userProfileData.fName + "?"}
              onClick={() => setIsNewPost(true)}
            />
          </div>
          <div className="col-md-1 bg-white" onClick={() => setIsNewPost(true)}>
            <i className=" text-center bg-white material-icons">add_a_photo</i>
          </div>
        </div>
      </div>
      <div>
        {isNewPost && (
          <CreatePost
            isNewPost={isNewPost}
            setIsNewPost={setIsNewPost}
          />
        )}
      </div>
      <div
        id={userProfileData._id}
        className="container justify-content-center my-3 border-style"
        style={{
          height: "90vh",
          border: "none",
          overflowY: "scroll",
          background: "none",
        }}
      >
        {newsFeedPosts.map((post) => {
            return (
              <Post
                key={post._id}
                setReload={setReload}
                postId={post._id}
                date={post.date}
                caption={post.caption}
                image={post.image}
                comments={post.comments}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Newsfeed;
