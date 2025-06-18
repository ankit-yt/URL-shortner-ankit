import React from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { useAuthContext } from '../context/authContext/useAuthContext';

function Auth() {
  const {isLogin}  = useAuthContext()

  return (
    <div className="w-full h-screen">
      {isLogin ? (
        <LoginForm  />
      ) : (
        <RegisterForm  />
      )}
    </div>
  );
}

export default Auth
