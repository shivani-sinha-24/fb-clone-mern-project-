import React from "react";
import Post from "../post/Post";
import CreatePost from "../createPost/CreatePost";

const Newsfeed = ({ id, isNewPost,userData, setUserData,setIsNewPost,feedPosts, setReload}) => {
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
              placeholder={"Whats on your mind, " + userData.fName + "?"}
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
            setUserData={setUserData}
            userData={userData}
            userId={id}
            isNewPost={isNewPost}
            setIsNewPost={setIsNewPost}
          />
        )}
      </div>
      <div
        id={id}
        className="container justify-content-center my-3 border-style"
        style={{
          height: "90vh",
          border: "none",
          overflowY: "scroll",
          background: "none",
        }}
      >
        {feedPosts.length > 0 ? (
          feedPosts.map((post) => {
            return (
              <Post
                key={post._id}
                userData={userData}
                setReload={setReload}
                postId={post._id}
                date={post.date}
                caption={post.caption}
                image={post.image}
                comments={post.comments}
              />
            );
          })
        ) : (
          <div className="my-2 bg-white">nothing to show here</div>
        )}
      </div>
    </div>
  );
};

export default Newsfeed;
