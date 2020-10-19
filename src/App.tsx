import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Edit from "./pages/Edit";
import Management from "./pages/Management";
import ResetPassword from "./pages/ResetPassword";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { AuthProvider } from "./AuthProvider";
import LoggedInRoute from "./LoggedInRoute";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/confirm" component={ResetPassword} />
          <Route path="/login" component={SignIn} />
          <LoggedInRoute exact path="/" component={Management} />
          <Route path="/edit" component={Edit} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
