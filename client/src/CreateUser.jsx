import React, { useState } from 'react';
import axios from 'axios';
import { addUser } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://merncrudreduxserver.onrender.com/create', { name, email, age })
            .then(res=> {
                dispatch(addUser(res.data))
                navigate('/')
            })
            .catch(err => { console.log(err) })
    }
    return (
        <div className='d-flex vh-100 bg-primary justofy-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Add User</h2>
                    <div className='mb-2'>
                        <label>Name</label>
                        <input type='text'
                            placeholder='Name'
                            className='form-control'

                            onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className='mb-2'>
                        <label>Email</label>
                        <input type='email'
                            placeholder='Email'
                            className='form-control'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='mb-2'>
                        <label>Age</label>
                        <input type='number'
                            placeholder='Enter Age'
                            className='form-control'
                            value={age}
                            onChange={(e) => { setAge(e.target.value) }} />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser