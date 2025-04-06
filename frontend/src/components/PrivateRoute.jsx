import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";
import { Loading } from "./Loading";

export const PrivateRoute = ({ children }) => {
  const { auth, authLoading } = useAuth();

  if (authLoading) {
    return <Loading />;
  }

  if (auth) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
