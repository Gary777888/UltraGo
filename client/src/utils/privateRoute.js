import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
   let auth = { token: true };

   //    const navigate = useNavigate();
   //    navigate("as")

   return auth.token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
