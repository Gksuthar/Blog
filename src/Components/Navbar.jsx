import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({setShowLogin,logout,token}) => {
  // const tokens = logout()
  return (
    <div>
      <header class="text-gray-600 body-font">
  <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
     <img 
  src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png" 
  alt="Custom Logo" 
  class="w-20 h-12 text-white p-1 bg-indigo-500 rounded-full"
/>

    </a>
    <nav class="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
      <Link to='/' class="mr-5 hover:text-gray-900">Home</Link>
      <Link class="mr-5 hover:text-gray-900">Lucifer</Link>
      <Link class="mr-5 hover:text-gray-900"> Link</Link>
      <Link class="mr-5 hover:text-gray-900">Fourth Link</Link>
    </nav>
    {!token ? (
      <button onClick={()=>setShowLogin(true)} 
      class="text-center inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-green-600  hover:text-white hover:cursor-pointer rounded text-base mt-4 md:mt-0">Login
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
      </svg>
    </button> ) :(
      <button onClick={logout} 
      class="text-center inline-flex items-center bg-gray-300 border-0 py-1 px-3 focus:outline-none hover:bg-green-600  hover:text-white hover:cursor-pointer rounded text-base mt-4 md:mt-0">Logout
      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
      </svg>
    </button>
    )
  }
  </div>
</header>
    </div>
  );
};

export default Navbar;
