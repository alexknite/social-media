import { Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/useAuth";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("userData"));

  const { auth, authLoading } = useAuth();

  if (authLoading) {
    return <Text>Loading...</Text>;
  }

  if (auth && user?.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
