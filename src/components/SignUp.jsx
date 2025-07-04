import React, { useEffect, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { handleSignUp } from '../Config';
import { useNavigate } from "react-router-dom";
import "../css/Auth.css";

function SignUp() {
  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const navigate = useNavigate();

  async function handleSignUpAction(e){
    e.preventDefault();
    const user =  await handleSignUp(e,setError);
    if(user){
        navigate("/home");
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setFormVisible(true);
    }, 100);
  }, []);

 

    return (
        <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-500
        via-gray-700 to-gray-900 px-4'>
        <div className={`relative bg-gray-800 text-white shadow-lg rounded-lg p-10 max-w-md w-full
        border border-gray-700 hover:shadow-[0_0_25px_5px_rgba(56,140,248,1)] transition duration-300
        ${formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transform transition-all duration-500
        ease-out`}>
        <h2 className='text-3xl font-bold text-center mb-4'>Create Account</h2>
        <p className='text-gray-400 text-center mb-6'>Sign up to get started</p>

        {error && <p className='text-red-500 text-center mb-4'>{error}</p>}

        <form onSubmit={(e)=>handleSignUpAction(e)} className='space-y-6'>
        <div>
            <label htmlFor="email" className='block text-gray-300 font-medium mb-1'>Email Address</label>
            <input required type="email" name="email" id="email" placeholder="Enter your email" className='w-full border-b
                border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none' />
        </div>

        <div className='relative'>
            <label htmlFor="password" className='block text-gray-300 font-medium mb-1'>Password</label>
            <input required type={passwordVisible ? 'text' : 'password'} name="password" id="password" placeholder="Enter your password" className='w-full border-b
                border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none' />
                <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className='absolute right-2 top-8 text-gray-400 hover:text-cyan-400 focus:outline-none'>
                {passwordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </button>
        </div>

            <div className='relative'>
                <label htmlFor="confirmPassword" className='block text-gray-300 font-medium mb-1'>Confirm Password</label>
                <input required type={confirmPasswordVisible ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" className='w-full border-b
                border-gray-600 bg-transparent text-white px-2 py-1 focus:border-cyan-400 focus:outline-none' />
                <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className='absolute right-2 top-8 text-gray-400 hover:text-cyan-400 focus:outline-none'>
                {confirmPasswordVisible ? <AiOutlineEyeInvisible className="h-5 w-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </button>
            </div>

            <button type="submit" className='w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 rounded-lg hover:bg-gradient-to-l
            hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 focus:ring focus:ring-cyan-300
                focus:outline-none shadow-md hover:shadow-lg'>
                Sign Up
            </button>
        </form>

        <p className='text-center text-gray-400 text-sm mt-6'>
            Already have an account?{" "}
            <button onClick={() => navigate("/")} className='text-cyan-400 hover:underline'>Login</button>
        </p>
    </div>
    </div>
    );
}

export default SignUp;
