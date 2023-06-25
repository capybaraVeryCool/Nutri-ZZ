// // import { useAuth } from "../contexts/Auth";
// // import { Navigate, Outlet, useLocation } from "react-router-dom";

// // const AuthRoute = () => {
// //   const { auth } = useAuth();
// //   const location = useLocation();

// //   return auth ? (
// //     <Switch />
// //   ) : (
// //     <Navigate to={"/login"} replace state={{ path: location.pathname }} />
// //   );
// // };

// // export default AuthRoute;

// import { useAuth } from "../contexts/Auth";
// import { Switch, useLocation, useHistory } from "react-router-dom";

// const AuthRoute = () => {
//   const { auth } = useAuth();
//   const location = useLocation();
//   const history = useHistory();

//   if (auth) {
//     return <Switch />;
//   } else {
//     history.replace({
//       pathname: "/login",
//       state: { path: location.pathname }
//     });
//   }
// };

// export default AuthRoute;
