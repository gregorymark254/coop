import React, { useEffect, useState } from 'react';
import axios from '../api/api'
import { useNavigate } from 'react-router-dom';
import AuthToken from '../components/Context/AuthToken';
import { toast } from 'sonner'
import greenLeaves from '../components/images/green-leaves-white-background@2x.png';
import bg from '../components/images/bg.png';
import { Eye, EyeOff } from 'lucide-react';

const Login = ({ setAccessToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Login function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await axios.post('/auth/login', { username, password });
      setAccessToken(token);
      toast.success('Login Successful.');
      navigate('/');
    } catch (error) {
      if (!error?.response) {
        toast.error('Network error! Check your connection.');
      } else {
        toast.error('An error occurred while logging in');
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (AuthToken) {
      navigate('/');
    }
  }, [navigate]);

  const handleContinue = () => {
    if (username.trim() !== '') {
      setShowPasswordField(true);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 bg-white h-dvh overflow-hidden poppins">
      <div className="w-full h-fit bg-repeat bg-">
        <img src={bg} alt="bg" className="w-full h-full" />
      </div>

      <div className="flex justify-center md:items-center h-screen ">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md absolute">
          <img src={greenLeaves} alt="green leaves" className="w-20 h-20 top-0 left-0" />

          <h2 className="text-2xl font-bold mb-4 text-[#009438] font-poppins">
            <span className="text-[#707070] uppercase block">Welcome to</span>
            <p className="font-bold text-4xl">
              <span className="block">Inua Mkulima -</span>
              Subsidy Program
            </p>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 my-4">
            {!showPasswordField && (
              <div>
                <h6 className="text-[#707070] font-medium">Enter your username to continue</h6>
                <div className="mb-4">
                  <label htmlFor="username" className="block mb-2 font-poppins text-[#707070]">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009438] font-poppins"
                  />
                </div>
              </div>
            )}

            {showPasswordField && (
              <div>
                <h6 className="text-[#707070] font-medium">Enter your password</h6>
                <div className="mb-4 relative">
                  <label htmlFor="password" className="block mb-2 font-poppins text-[#707070]">
                    Password
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#009438] font-poppins pr-10"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 -translate-y-1/2 right-3 text-gray-500 hover:text-gray-700"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {!showPasswordField ? (
              <button
                type="button"
                onClick={handleContinue}
                className="w-full bg-[#E8B40A] hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-poppins"
              >
                Continue <span className="ml-10">{">"}</span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full bg-[#E8B40A] hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-poppins"
              >
                {loading ? 'Please wait' : 'Login'} <span className="ml-10">{">"}</span>
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;