import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./ResetPassword.scss";

import FLInput from "../../components/FLInput";
import Button from "../../components/Button";

import {
  sendPasswordResetEmail,
  resetAuthState,
} from "../../redux/auth/auth-actions";
import { authSelector } from "../../redux/auth/auth-selectors";

function buttonText(loading, sent) {
  if (loading) {
    return "Sending...";
  }

  if (sent) {
    return "Email Sent!";
  }

  return "Send password reset email";
}

function ResetPassword() {
  const dispatch = useDispatch();
  const {
    isSendingPasswordReset,
    passwordResetError,
    passwordResetSent,
  } = useSelector(authSelector);

  const [email, setEmail] = useState("");

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(sendPasswordResetEmail(email));
    setEmail("");
  }

  function handleSetEmail(e) {
    setEmail(e.target.value);
  }

  return (
    <div className="resetpassword">
      <section className="resetpassword__wrapper">
        <form className="resetpassword__form" onSubmit={handleSubmit}>
          <FLInput
            required
            label="email"
            type="text"
            id="email"
            className="form-input"
            value={email}
            onChange={handleSetEmail}
          ></FLInput>
          <Button
            type="submit"
            disabled={isSendingPasswordReset || passwordResetSent}
            text={buttonText(isSendingPasswordReset, passwordResetSent)}
          ></Button>
        </form>
        {passwordResetError && <section>{passwordResetError}</section>}
      </section>
    </div>
  );
}

export default ResetPassword;
