import { createContext, useContext, useEffect, useState } from "react";
import { getUserWithToken } from "./../services/authService";

const AuthContext = createContext();

function AuthProvider(props) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token_episteme");
    !!token &&
      getUserWithToken(token)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          localStorage.removeItem("token_episteme");
        });
  }, []);

  const value = { user, setUser };
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within a AuthProvider");
  return context;
}

export { useAuth, AuthProvider };
