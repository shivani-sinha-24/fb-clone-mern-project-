import React from 'react'

const UsersList = ({user}) => {
  return (
    <div className='m-2'>
        <div className='bg-white'>{user.fName} {user.lName}</div>
        <div className='bg-white'>{user.email}</div>
        <div className='bg-white'>{user.date} {user.month} {user.year}</div>
    </div>
  )
}

export default UsersList
