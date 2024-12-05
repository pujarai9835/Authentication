import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // For routing
import { ToastContainer, toast } from 'react-toastify'; // Toast notifications
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        if (!email || !password) {
            return toast.error('All fields are required');
        }

        try {
            const result = await axios.post('http://localhost:8080/auth/login', {
                email,
                password,
            });

            setLoginInfo({ email: '', password: '' });

            const { success, msg,jwtToken } = result.data;
            if (success) {
                toast.success(msg || 'Login successful!');
                sessionStorage.setItem("token",jwtToken);
                setTimeout(() => {
                    navigate('/home'); // Redirect to home page
                }, 2000);
            } else {
                toast.error('Login failed. Check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <div className="container">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={loginInfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginInfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit">Login</button>
                    <span>
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </>
    );
}

export default Login;
