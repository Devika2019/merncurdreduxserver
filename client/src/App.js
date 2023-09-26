
import React, { useEffect } from 'react';
import User from './User';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateUser from './CreateUser';
import {getUsers} from './redux/userSlice';
import{useDispatch} from 'react-redux';
import UpdateUser from './UpdateUser';

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const respone = await axios.get('https://merncrudreduxserver.onrender.com');
        dispatch(getUsers(respone.data));

      }catch(err){
        console.log(err)
      }
    }
    fetchData();
  },[])
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<User/>}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/edit/:id' element={<UpdateUser/>}></Route>
      </Routes>
      </BrowserRouter>
    
    </div>
  );
}

export default App;
