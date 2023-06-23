import { Outlet, Navigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import authService from "../services/auth";

const PrivateRoute = () => {
   const { username } = useParams();

   console.log("check cap letter.....", Cookie.get("username"), username);
   return Cookie.get("accessToken") !== null &&
      Cookie.get("username") === username ? (
      <Outlet />
   ) : (
      <Navigate to="/" />
   );
};

export default PrivateRoute;
