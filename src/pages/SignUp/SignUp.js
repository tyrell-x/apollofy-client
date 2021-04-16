import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import "./SignUp.scss";

import Button from "../../components/Button";
import FLInput from "../../components/FLInput";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signUpWithEmailRequest
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signUpWithEmailRequest(email, password));
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleSetFirstName(e) {
    setFirstName(e.target.value);
  }  
  
  function handleSetLastName(e) {
    setLastName(e.target.value);
  }

  function handleSetRepeatedPassword(e) {
    setRepeatedPassword(e.target.value);
  }

  function handleSetPhoneNumber(e) {
    setPhoneNumber(e.target.value);
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
                id="firstName"
                value={firstName}
                onChange={handleSetFirstName}
              />
              <FLInput
                label="last name"
                type="text"
                id="lastName"
                value={lastName}
                onChange={handleSetLastName}
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
              value={repeatedPassword}
              onChange={handleSetRepeatedPassword}
            />
            <FLInput
              label="phone number"
              type="number"
              id="phone_number"
              value={phoneNumber}
              onChange={handleSetPhoneNumber}
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
