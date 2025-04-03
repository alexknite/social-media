import { useEffect, useState, createContext, useContext } from "react";
import { get_auth, login, logout } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const nav = useNavigate();

  const check_auth = async () => {
    try {
      await get_auth();
      setAuth(true);
    } catch {
      setAuth(false);
    } finally {
      setAuthLoading(false);
    }
  };

  const auth_login = async (username, password) => {
    const data = await login(username, password);

    if (data.success) {
      setAuth(true);
      const userData = {
        username: data.user.username,
        bio: data.user.bio,
        email: data.user.email,
        first_name: data.user.first_name,
        last_name: data.user.last_name,
      };
      localStorage.setItem("userData", JSON.stringify(userData));
      nav(`/${username}`);
    } else {
      alert("Invalid username or password");
    }
  };

  const auth_logout = async () => {
    const data = await logout();
    if (data.success) {
      setAuth(false);
      nav("/login");
    } else {
      alert("Error loggin out");
    }
  };

  useEffect(() => {
    check_auth();
    // }, [window.location.pathname]);
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, authLoading, auth_login, auth_logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
