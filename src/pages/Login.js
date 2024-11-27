import React, { useEffect, useState} from 'react';
import axios from '../api/api'
import { useNavigate } from 'react-router-dom';
import AuthToken from '../components/Context/AuthToken';
import {toast} from 'sonner'


const Login = ({ setAccessToken }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await axios.post('/auth/login',
        { email, password }
      );
      setAccessToken(token);
      toast.success('Login Successful.');
      navigate('/app/dashboard');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection.');
      } else {
        toast.error('An error occured while logging in');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AuthToken) {
      navigate('/app/dashboard');
    }
  }, [navigate]);
  
  
  return (
    <div className='flex md:flex-row justify-center gap-8 md:gap-0 flex-col h-screen w-full'>
      <div className='md:bg-customGreen flex justify-center md:w-1/2 items-center'>
        <img src="https://store-images.s-microsoft.com/image/apps.39241.13695268441854138.b66d38c1-5399-4eb1-919c-81ca75db686f.2c431d86-0de1-4c9a-a4ca-53cc8332ef13" alt="" />
      </div>
      <div className=" flex justify-center md:w-1/2 items-center relative ">

      <div className="bg-white w-[70%] p-4 rounded ">
        <div className='flex flex-col items-center gap-1 md:mb-12 mb-6'>
          <h2 className='text-customGreen text-3xl text-center font-semibold overflow-hidden'>Login</h2>
          <div className='w-16 border border-customGreen'></div>
          <div className='w-12 border border-customGreen'></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-[#737272]">Email</label>
            <input 
              type="email" 
              id="email" name="email" 
              className="w-full bg-[#F5F5F5] px-3 py-2 border rounded-lg" 
              required autoComplete='off' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-[#737272]">Password</label>
            <input 
              type="password" 
              id="password" name="password" 
              className="w-full bg-[#F5F5F5] px-3 py-2 border rounded-lg" 
              required autoComplete='off' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-customGreen text-white px-4 py-2 rounded-lg hover:bg-green-600">{loading ? 'Please Wait...' : 'Login'}</button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Login
