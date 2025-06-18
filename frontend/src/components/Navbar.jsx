import { Link, redirect, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { useAuthContext } from "../context/authContext/useAuthContext";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from "../api/user.api";
import { logout } from "../store/slice/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const {setIsLogin} = useAuthContext()
  const auth = useSelector(state=>state.auth) 
  const dispatch = useDispatch()
  const navigate = useNavigate()
const toggleMenu = () => setMenuOpen(!menuOpen);

const handleLogOut = async ()=>{
  try{
    await logoutUser()
    dispatch(logout())
    return navigate({to:"/auth"})
    

  }catch(e){
    throw new Error(e.message)
  }
}

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 text-blue-600 font-bold text-2xl">
            🔗 LinkEase
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              href={`${auth.isAuthenticated ? "/dashboard" : "/"}`}
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              {auth.isAuthenticated ? "Dashboard" : "Shortener"}
            </Link>
            {auth.isAuthenticated ? (
              <button
                onClick={handleLogOut}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
              >
                Log out
              </button>
            ) : (
              <>
                <Link
                  onClick={() => setIsLogin(true)}
                  href="/auth"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Login
                </Link>
                <Link
                  onClick={() => setIsLogin(false)}
                  href="/auth"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

    {/* 📱 Mobile Menu */}
{menuOpen && (
  <div className="md:hidden bg-white border-t border-gray-200">
    <div className="flex flex-col space-y-2 p-4">
      <Link
        href={auth.isAuthenticated ? "/dashboard" : "/"}
        className="text-gray-700 hover:text-blue-600 font-medium transition"
      >
        {auth.isAuthenticated ? "Dashboard" : "Shortener"}
      </Link>

      {auth.isAuthenticated ? (
        <button
          onClick={handleLogOut}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium text-center"
        >
          Log out
        </button>
      ) : (
        <>
          <Link
            onClick={() => setIsLogin(true)}
            href="/auth"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Login
          </Link>
          <Link
            onClick={() => setIsLogin(false)}
            href="/auth"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition font-medium text-center"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  </div>
)}

    </nav>
  );
};

export default Navbar;
