import { useAuth } from "../../contexts/useAuth";
import { Navigate } from "react-router-dom";
import { Loading } from "../Loading";

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const { auth, authLoading } = useAuth();

  if (authLoading) {
    return <Loading />;
  }

  if (auth && user?.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
