import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate hook for redirection
import { ToastContainer, toast } from 'react-toastify'; // Toast for notifications
import 'react-toastify/dist/ReactToastify.css'; // Toast styles
import axios from 'axios'; // For API calls

function Signup() {
    const [signUpinfo, setSignUpinfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate(); // Initialize the navigate hook

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpinfo((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { name, email, password } = signUpinfo;

        if (!name || !email || !password) {
            return toast.error('All fields are required');
        }

        try {
            const result = await axios.post('http://localhost:8080/auth/signup', {
                name,
                email,
                password,
            });

            setSignUpinfo({ name: '', email: '', password: '' });

            const { success, msg } = result.data;
            if (success) {
                toast.success(msg || 'Signup successful');
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                }, 3000);
            } else {
                toast.error('Signup failed. Try again.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <>
            <div className="container">
                <h1>Signup</h1>
                <form onSubmit={handleSignUp}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={signUpinfo.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            autoFocus
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={signUpinfo.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={signUpinfo.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                        />
                    </div>
                    <button type="submit">Sign Up</button>
                    <span>
                        Already have an account? <Link to="/login">Login</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </>
    );
}

export default Signup;







