import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./styles/App.scss";
import * as ROUTES from "./routes";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UploadSong from "./pages/UploadSong";
import UploadImage from "./pages/UploadImage";
import ResetPassword from "./pages/ResetPassword";
import { onAuthStateChanged } from "./services/auth";
import { syncSignIn, signOut } from "./redux/auth/auth-actions";
import Account from "./pages/Account/Account";
import ProtectedRoute from "./components/ProtectedRoute";
import Library from "./pages/Library";
import Navbar from "./components/Navbar";
import MusicPlayer from "./components/MusicPlayer";
import Playlist from "./pages/Playlist";
import Search from "./pages/Search/index.js";
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
      <Navbar />
      <main>
        <Switch>
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
          <ProtectedRoute path={ROUTES.HOME} component={Home} exact />
          <ProtectedRoute path={ROUTES.ACCOUNT} component={Account} exact />
          <ProtectedRoute path={ROUTES.UPLOAD_SONG} component={UploadSong} />
          <ProtectedRoute path={ROUTES.UPLOAD_IMAGE} component={UploadImage} />
          <ProtectedRoute path={ROUTES.LIBRARY} component={Library} exact />
          <ProtectedRoute
            path={`${ROUTES.PLAYLIST}/:id`}
            component={Playlist}
            exact
          />
          <ProtectedRoute
            path={`${ROUTES.SEARCH}/:text`}
            component={Search}
            exact
          />

        </Switch>
      </main>
      <MusicPlayer />
    </div>
  );
}

export default App;
