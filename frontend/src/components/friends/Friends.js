import axios from 'axios';
import React,{useState} from 'react'
import UsersList from '../usersList/UsersList';

const Friends = () => {

  const [searchInput,setSearchInput]=useState("");
  const[usersList,setUsersList]=useState([])

  const findUsers = e=>{
    e.preventDefault()
    axios.post(`http://localhost:3009/search-user`,searchInput).then(res=>{
      setUsersList(res.data);
    })
  }
  
  return (
    <div className="container bg-white justify-content-center my-3 p-3 border-style">
      <form className='bg-white row' onSubmit={findUsers}>
        <div className="col-11 m-0 bg-white">
        <input name="searchusertext"  type="search" className="form-control  " placeholder='&#128269; Search Pepople' autoFocus={true} onChange={e=>setSearchInput(e.target.value)}/>
        </div>
        <div className="col-1 m-0 bg-white p-0" onClick={findUsers}>
        <button className="btn m-0">&#128269;</button>      
        </div>
        <div className="found-users-list m-2">
          {usersList.length>0&&(
            usersList.map(user=>{return(
              <UsersList key={user._id} user={user}/>
              )
            })
          )}
        </div>
      </form> 
    </div>
  )
}

export default Friends
