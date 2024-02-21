import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // useNavigate hook

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        console.log('form', form);
        // Here you can add your login logic, for now just logging the form data
        const result = await login(form);
        console.log("form", result);
        setErrors({}); // Reset errors

        if (result.status === 200) {
          
            if (result.status === 200) {
                localStorage.setItem('user', JSON.stringify(result.data.data));
                navigate('/'); // Use navigate to redirect
            }
        } else if (result.status === 201) {
            // Handle validation errors
            setErrors(result.data.data);
            toast.error(result.message);

        } else {
            // Handle other HTTP status codes or network errors
            toast.error(result.message);
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    <legend>Login</legend>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Username</label>
                                        <input type="text" onChange={handleChange} name="username" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter username" style={{ maxWidth: '300px', margin: '0 auto' }} />
                                        {errors?.username && <small className="form-text text-muted">{errors.username.message}</small>}
                                        
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1" className="form-label mt-4">Password</label>
                                        <input type="password" onChange={handleChange} name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off" style={{ maxWidth: '300px', margin: '0 auto' }} />
                                        {errors?.password && <small className="form-text text-muted">{errors.password.message}</small>}
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-4" style={{ display: 'block', margin: '0 auto' }}>Login</button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default Login;
