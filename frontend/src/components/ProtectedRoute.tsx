import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: Props) => {

  const token = localStorage.getItem("token");

 
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Not Logged In
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Admin Route
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;