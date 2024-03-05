/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const AuthenticatedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token === "" || token === undefined || !token) {
    return <Navigate to="/auth" />;
  }
  return children;
};

export default AuthenticatedRoute;
