import React from 'react';
import axios from 'axios';

const Comments = ({userData,cmnt,setReload,userId,postId}) => {
 
  const cmntDetail = {
    userId:userData._id,
    cmnt,
    userName:userData.fName+" "+userData.lName,
    postId
  }

   const deleteCmnt = ()=>{
    axios.post(`http://localhost:3009/delete-comment`,cmntDetail).then(res=>{
      setReload(true);
    })
  }

  return (
    <div className='bg-white container my-3 p-2 border-style'>
      <div className="row bg-white">
              <div className="col-11 bg-white">
                <div className="card m-2 bg-white"> 
                  <h6 className="card-title my-0 bg-white" name={userData.fName+" "+userData.lName}>{userData.fName+" "+userData.lName}</h6>
                  <p  className="card-text bg-white" name={cmnt}>{cmnt}</p>
                </div>
              </div>
              <div className="col-1 bg-white" onClick={()=>{deleteCmnt()}}><i className="fa fa-trash"></i></div>
            </div>
    </div>
  )
}

export default Comments
