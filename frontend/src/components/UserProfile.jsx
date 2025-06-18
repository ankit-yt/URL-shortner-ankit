import React from "react";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {

  const auth = useSelector((state) => state.auth);
  const authenticated = auth.isAuthenticated;
  console.log(authenticated);
  return (
    <>
      {authenticated && (
        <div className="bg-gradient-to-r from-blue-50 to-white shadow-md border  border-gray-200 rounded-2xl p-5 flex flex-col min-w-66 items-center gap-4 mb-8 hover:shadow-lg transition duration-300">
          <div className="bg-gray-400 mt-10 overflow-hidden w-32 h-32 flex justify-center items-center rounded-full shadow-inner">
            <img
              src={auth.user.avatar}
              className="w-full h-full object-cover"
              alt="User Avatar"
            />
          </div>

          <div className="flex flex-col">
            <p className="text-xl font-bold text-center text-gray-800 tracking-wide">
              {auth.user.name.charAt(0).toUpperCase() + auth.user.name.slice(1)}
            </p>
            <p className="text-sm text-gray-600">
              {auth.user.email || "user@example.com"}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
