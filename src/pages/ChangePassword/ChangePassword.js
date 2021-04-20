import React, { useEffect, useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
//importing the firebase file
import firebase from "firebase/app";
import "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";


import "./ChangePassword.scss";
import "../../components/FLInput/FLInput.scss";

import Header from "../../components/Header";
import * as ROUTES from "../../routes";

import {
  resetAuthState,
  signInWithGoogleRequest,
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  // const [email, setEmail] = useState(""); // old code
  const [password, setPassword] = useState("");
  // This one goes to confirm the password
  const [confirmPassword, confirmSetPassword] = useState("");

  const user = firebase.auth().currentUser;

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleLoginWithGoogle(e) {
    e.preventDefault();
    dispatch(signInWithGoogleRequest());
  }

  function handleSubmit(e) {
    e.preventDefault();

    // dispatch(signUpWithEmailRequest(email, password));

    // setEmail("");
    setPassword("");
    confirmSetPassword("");


  }


  function handleSetPassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    if (e.target.value !== this.state.password) {
      // message.error('error');
      this.setState({confirmPassword: e.target.value})
    }

    else {
      user.updatePassword(confirmPassword).then(function() {
          console.log("Password updated")
      }).catch(function(error) {
          console.log("Could not change password")
      });
      
    }
}



  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <div className="input-container">
        <Header />
        <section className="Login__wrapper">
          <h1 className="text-2xl font-bold mb-6">Change Password</h1>
          <hr className="my-4" />
          {/* Here will introduce th whole structure for changing the password */}
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
            <label htmlFor="newPassword" className="form-label">
              New password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={handleSetPassword}
            />
            <label htmlFor="newPassword" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={confirmPassword}
              onChange={handleConfirmPassword}
            />
            <button
              className="btn btn-primary w-full"
              type="submit"
              disabled={isSigningUp}
            >
              Change password
            </button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
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
      </div>
    </>
  );
}

export default SignUp;
