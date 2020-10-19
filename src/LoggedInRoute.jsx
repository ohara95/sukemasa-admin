import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const LoggedInRoute = ({ component: Component, ...other }) => {
  const { user } = useContext(AuthContext);
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
