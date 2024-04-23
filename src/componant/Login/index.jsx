import React, { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send the form data to your backend for authentication
        console.log('Form data:', formData);
        // Reset form fields
        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <div className="max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="password" className="block">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500" required />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300">Login</button>
            </form>
        </div>
    );
};

export default Login;
