import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the CSS

const LoginPage = ({ url, setShowLogin, setToken }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let new_url = url;
    if (currState === "Login") {
      new_url += "/api/login";
    } else {
      new_url += "/api/register";
    }

    try {
      const response = await axios.post(new_url, data);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);  
        toast("Login Successful!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowLogin(false);
      } else {
        toast.error(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Error during login or registration:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="z-10 w-full h-full bg-black bg-opacity-60 grid place-items-center ">
      <ToastContainer
        position="top-right"
        autoClose={2000 }
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <form
        onSubmit={onLogin}
        className="flex flex-col gap-6 p-4 rounded-lg bg-white text-gray-600 animate-fadeIn shadow-2xl w-[90vw] sm:w-[min(43vw,330px)] mx-auto sm:px-4 sm:py-6"
      >
        <div className="flex justify-between items-center text-black">
          <h2>{currState}</h2>
        </div>
        <div className="flex flex-col gap-5">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              className="outline-none border border-gray-300 p-2 rounded-md w-full"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            className="outline-none border border-gray-300 p-2 rounded-md w-full"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            className="outline-none border border-gray-300 p-2 rounded-md w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-md text-lg cursor-pointer hover:bg-orange-600 w-full"
        >
          {currState === "Login" ? "Login" : "Create account"}
        </button>
        <div className="flex items-start gap-2 mt-[-12px]">
          <input type="checkbox" id="terms" className="mt-1" required />
          <p className="text-sm">
            By continuing, I agree to the terms of use & privacy policy.
          </p>
        </div>
        {currState === "Login" ? (
          <p className="text-sm">
            Create a new account?{" "}
            <span
              onClick={() => setCurrState("Sign Up")}
              className="text-orange-500 font-semibold cursor-pointer"
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-sm">
            Already have an account?{" "}
            <span
              onClick={() => setCurrState("Login")}
              className="text-orange-500 font-semibold cursor-pointer"
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
export default LoginPage;
