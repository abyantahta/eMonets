import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const RequiredAuth = () => {
  // const { auth } = useAuth();
  const [cookies] = useCookies(["auth"]);
  const location = useLocation();

  return cookies.auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequiredAuth;
