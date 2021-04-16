import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./SignUp.scss";

import Button from "../../components/Button";
import FLInput from "../../components/FLInput";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest,
  signUpWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
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

    dispatch(signUpWithEmailRequest(email, password));

    setEmail("");
    setPassword("");
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
      <main className="signup">
        <section className="signup__wrapper">
          <form className="signup__form" onSubmit={handleSubmit}>
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <FLInput
                label="first name"
                type="text"
                id="email"
                onChange={handleSetEmail}
              />
              <FLInput
                label="last name"
                type="text"
                id="email"
                onChange={handleSetEmail}
              />
            </div>
            <FLInput
              required
              label="email"
              type="text"
              id="email"
              value={email}
              onChange={handleSetEmail}
            />
            <FLInput
              required
              label="password"
              type="password"
              id="password"
              value={password}
              onChange={handleSetPassword}
            />
            <FLInput
              required
              label="repeat password"
              type="password"
              id="password_repeat"
              value={password}
              onChange={handleSetPassword}
            />
            <FLInput
              label="phone number"
              type="number"
              id="password_repeat"
              onChange={handleSetPassword}
            />
            <Button
              style={{
                maxWidth: 150,
              }}
              type="submit"
              text="Sign up"
              disabled={isSigningUp}
            >
            </Button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
        </section>
      </main>
    </>
  );
}

export default SignUp;
