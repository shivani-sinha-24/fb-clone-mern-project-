import React, { useState} from "react";
import Post from "../post/Post";

const Profile = ({ userData }) => {
  const [reload, setReload] = useState(false);
  return (
    <div>
      <div
        id={userData._id}
        className="container justify-content-center my-3 border-style"
        style={{
          height: "90vh",
          border: "none",
          overflowY: "scroll",
          background: "none",
        }}
      >
        {userData?.posts?.map((post) => {
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
