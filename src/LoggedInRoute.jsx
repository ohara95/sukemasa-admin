import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";
import Spinner from "./pages/Spinner";

const LoggedInRoute = ({ component: Component, ...other }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Route
      {...other}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to={"/login"} />
      }
    />
  );
};

export default LoggedInRoute;
