import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./styles/App.scss";

import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
// import ChangePassword from "./pages/ChangePassword";

import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import Account from "./pages/Account/Account";
import EditProfile from "./pages/EditProfile";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = onAuthStateChanged((user) => {
      if (user) {
        dispatch(syncSignIn());
      } else {
        dispatch(signOut());
      }
    });

    return () => {
      if (unsubscribeFromAuth) {
        unsubscribeFromAuth();
      }
    };
  }, [dispatch]);

  return (
    <div className="App__container">
      <Switch>
        {/* <Route path={ROUTES.PROFILE_EDIT} component={Profile} /> */}
        {/* <Route path={ROUTES.PROFILE} component={Profile} /> */}
        <Route path={ROUTES.SIGN_UP} component={SignUp} />
        <Route path={ROUTES.LOGIN} component={Login} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        <Route path={ROUTES.HOME} component={Home} exact />
        <Route path={ROUTES.ACCOUNT} component={Account} exact />
        <Route path={ROUTES.EDIT_PROFILE} component={EditProfile} exact />
        {/* <Route path={ROUTES.CHANGE_PASSWORD} component={ChangePassword} exact /> */}
      </Switch>
    </div>
  );
}

export default App;
