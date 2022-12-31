import React, { useState, useEffect } from "react";
import "./createPost.css";
import axios from 'axios';
import moment from 'moment';

const CreatePost = ({userData,setIsNewPost}) => {
  const[post,setPost]=useState({
    userId:userData._id,
    caption:"",
    image:"",
    date:moment().format('MMMM Do YYYY, h:mm:ss a')
  });
  const [file, setFile] = useState("");
  const [fileDataURL, setFileDataURL] = useState(null);
  const changeHandler = (e) => {
    const {name} = e.target;
    setFile( e.target.files[0]);  
    console.log(file);
    setPost({ ...post, [name]:  e.target.files[0] });
  };
  const changeHandle=(e)=>{
    const {name,value} = e.target;;
    setPost({ ...post, [name]: value });
  }
  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]); 
  const deleteImg = (e)=>{
    e.preventDefault()
    setPost({ ...post, image: "" });
    setFileDataURL(null)
  }

  const createPost=async(e)=>{
    e.preventDefault();
    setIsNewPost(true)
    const config = {headers:{"Content-Type":"multipart/form-data"}}
    await axios.post("http://localhost:3009/post",post,config).then(res=>{
      setIsNewPost(false)
    }) 
  }
  return (
    <div className="create-post bg-white container my-3 p-2 border-style" style={{border:"2px solid rgb(231, 225, 225)"}}>
      <div className="bg-white m-2 row">
        <span className="bg-white mx-1 col-11"><h5 className="bg-white text-center">Create Post</h5></span>
        <span className= "col text-center" type="button" style={{borderRadius:'50px'}} onClick={()=>{setIsNewPost(false)}}>
          X
          </span>
      </div>
      <hr />
      <form method="post" className="bg-white" encType="multipart/form-data">
      <div className="bg-white  m-2 row">
      <div className="bg-white col-10">
        <input
        style={{
          border:"none",
          fontSize:"large"
        }}
          className="bg-white form-control"
          type="text"
          name="caption"
          id="caption"
          value={post.caption}
          placeholder={"Whats on your mind, "+userData.fName+"?"}
          onChange={changeHandle}
        />
      </div>
      <div className= "bg-white col text-center">
          <label htmlFor="image" className="bg-white text-center"><i className=" text-center bg-white material-icons">add_a_photo</i> Photos</label>
          <input
            type="file"
            name="image"
            id="image"
            // value={post.image}
            accept=".png, .jpg, .jpeg"
            onChange={changeHandler}
            style={{ display: "none" }}
          />
         </div>
      </div>
      <div className="card">
        {fileDataURL ? (
          <div className="bg-white p-3" style={{height:"18rem",border:"none",overflowY:"scroll"}}>
            <div className="bg-white card justify-content-center">
              <button onClick={deleteImg} className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              X{/* &#x2715; */}
              </button>
              <img
                src={fileDataURL}
                alt="preview"
                style={{
                  width: "100%",
                  height: "auto",
                  border:"none"
                }}
              />
          </div>
          </div>
        ) : null}
       </div>
       <input className="form-control" type='text' defaultValue={moment().format('MMMM Do YYYY, h:mm a')} name='date' style={{display:"none"}}></input>
       <div className="d-grid gap-2 mt-2 btn btn-primary" onClick={createPost}>
          Post
        </div>
      </form>
   </div>
  );
};

export default CreatePost;
