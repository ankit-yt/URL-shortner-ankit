import React from "react";
import UrlForm from "../components/UrlForm";
import UserProfile from "../components/UserProfile";
import { useMediaQuery } from 'react-responsive';
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import loader from '../assets/animation/loader.json'

function Dashboard() {
const isDesktop = useMediaQuery({ minWidth: 768 });
const  auth = useSelector(state=>state.auth)

  return (
    <div className="min-h-screen pb-10 flex bg-gray-50 pt-10 px-4 sm:px-6 lg:px-8 font-sans">
        {auth.isLoading && (
          <div className="w-full h-screen flex justify-center items-center backdrop-blur-sm    overflow-hidden absolute top-0 left-0 z-50 bg-black/30 ">
       
          <Lottie
        animationData={loader}
        loop={true}
        className="w-72"
        autoplay={true}
      />
        
        </div>
        )}
       {isDesktop && <UserProfile />}
      <div className="w-full md:w-2/3  mx-auto space-y-10 mt-10">
   <h2 className="text-xl sm:text-2xl md:text-3xl mt-4 sm:mt-5 font-bold text-gray-800 mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3 text-center sm:text-left">
  <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
    🔗 Ready to Shrink the Web?
  </span>
</h2>



        <UrlForm />
      </div>
    </div>
  );
}

export default Dashboard;
