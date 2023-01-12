import React, { useState} from "react";
import { useSelector } from "react-redux";

import Post from "../post/Post";

const Profile = ({ userData }) => {

  const userProfileData = useSelector(state=>state.loginUserDataReducer)

  const [reload, setReload] = useState(false);
  return (
    <div>
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
        {userProfileData?.posts?.map((post) => {
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
        })}
      </div>
    </div>
  );
};

export default Profile;
