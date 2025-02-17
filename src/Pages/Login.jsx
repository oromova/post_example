import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const Login = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://realauto.limsa.uz/api/auth/signin",
      data: {
        "phone_number": phone,
        password: password
      }
    }).then(res => {
      console.log(res);
      localStorage.setItem("token", res?.data?.data?.tokens?.accessToken?.token);
      toast.success("Muvaffaqiyatli o'tildi")
      navigate("/")
    }).catch((error) => {
      console.log(error, "error");
    });
  };

  return (
    <div>
      <form class="w-full max-w-sm">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="username">
              Full Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="username"
              type="text"
              onChange={(e) => setPhone(e?.target?.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="password">
              Password
            </label>
          </div>
          <div class="md:w-2/3">
            <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e?.target?.value)}
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"></div>
          <div class="md:w-2/3">
            <button
              class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={Login}
            >
              Sign In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;