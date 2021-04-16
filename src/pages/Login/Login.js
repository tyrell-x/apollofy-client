import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import GoogleIcon from "../../assets/images/google-icon.png";
import AppLogo from "../../assets/images/logo.png";

import FLInput from "../../components/FLInput";
import Button from "../../components/Button";

import "./Login.scss";

import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signInWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function Login() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signUpWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signInWithEmailRequest(email, password));
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="login">
        <section className="login__wrapper">
          <div className="login__logo">
            <img alt="App Logo" src={AppLogo}></img>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <FLInput
              label="email"
              type="text"
              id="email"
              required
              value={email}
              onChange={handleSetEmail}
            />
            <FLInput
              label="password"
              type="password"
              id="password"
              required
              value={password}
              onChange={handleSetPassword}
            />
            <Button style={{maxWidth: 150}} type="submit" disabled={isSigningUp} text="Log in"></Button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
          <button
            className=""
            onClick={handleLoginWithGoogle}
            disabled={isSigningUp}
          >
            <img
              alt="google icon"
              src={GoogleIcon}
              style={{
                height: "40px",
                display: "inline-block",
                marginRight: "20px",
              }}
            ></img>
            <span>Sign in with Google</span>
          </button>

          <button className="">
            <Link to={ROUTES.SIGN_UP} className="w-full" disabled={isSigningUp}>
              Sign Up
            </Link>
          </button>

          <section className="mt-4">
            <hr className="mt-1 mb-4" />
            <Link
              to={ROUTES.RESET_PASSWORD}
              className="underline text-blue-gray-200 w-full text-center block"
            >
              Reset password
            </Link>
          </section>
        </section>
      </main>
    </>
  );
}

export default Login;
