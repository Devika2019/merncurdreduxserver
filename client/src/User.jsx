import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Link} from 'react-router-dom';
import { deleteUser } from './redux/userSlice';

import{ useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

function User() {
const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
const handleDelete =(id)=>{
axios.delete('https://merncrudreduxserver.onrender.com/deleteUser/'+id)
.then(res=>{
 dispatch(deleteUser({id})) 
}).catch(err=>{
  console.log(err)
})
}

  
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
<div className="w-50 bg-white rounded p-3">
<Link to={"/create"} className='btn btn-success btn-sm'>Add +</Link>
<table className='table'>
  <thead>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Age</th>
    <th>Action</th>
    </tr>
    </thead>
    <tbody>
      {users.map(user=>{
        return <tr>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.age}</td>
          <td>
            <Link to={`edit/${user.id}`} className='btn btn-sm btn-success me-2'>Update</Link>
            <button onClick={()=> handleDelete(user.id)} className='btn btn-sm btn-danger'>Delete</button>
          </td>
        </tr>
      })}
    </tbody>
</table>
</div>
    </div>
  )
}

export default User