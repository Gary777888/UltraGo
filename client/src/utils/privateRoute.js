import { Outlet, Navigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import authService from "../services/auth";

const PrivateRoute = () => {
   // const [isLoggedIn, setIsLoggedIn] = useState(false);
   const { username } = useParams();

   // console.log("check user.....", authService.getCurrentUser().accessToken);
   // console.log("check Cookie...", Cookie.get("accessToken"));
   // let emptyToken = "";

   // if (authService.getCurrentUser().accessToken) {
   //    emptyToken = authService.getCurrentUser().accessToken;
   // }
   return Cookie.get("accessToken") !== null &&
      Cookie.get("username") === username ? (
      <Outlet />
   ) : (
      <Navigate to="/" />
   );
};

export default PrivateRoute;
