import React, { useState } from "react";
import { AuthContext } from "./authInstance";
export const AuthContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
