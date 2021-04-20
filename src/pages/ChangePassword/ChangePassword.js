import React, { useEffect, useState, useRef, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import { changePassword } from "../../redux/auth/auth-actions";
import "./ChangePassword.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import FLInput from "../../components/FLInput";



function ChangePassword(props) {
  const {
    label,
    register = () => {},
    name,
    rules,
    error,
    ...attributes
  } = props;
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [active, setActive] = useState(false);
  const [type, setType] = useState(attributes?.type || "text");
  const errorMessage = useSelector((state) => state.auth?.passwordChangeError);
  const history = useHistory();
  const [userPassword, setUserPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (userPassword.newPassword === userPassword.confirmPassword) {
      dispatch(changePassword(userPassword));
    }
  }

  useEffect(() => {
    if (errorMessage === null) {
      history.push("/");
    }
  }, [errorMessage, history]);

  const handleChange = (e) => {
    setUserPassword({ ...userPassword, [e.target.name]: e.target.value });
  };


  // functions for Pablo style

  const changeVisibility = useCallback(() => {
    setType((type) => (type === "password" ? "text" : "password"));
  }, []);

  const activate = () => {
    setActive(true);
  };

  const tryDesactivate = (event) => {
    !event.target.value ? setActive(false) : setActive(true);
  };





  return (
    <>
      <main className="changePassword">
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
          <FLInput
                    name="currentPassword"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Current Password"
                />
          <FLInput
                    name="currentPassword"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Current Password"
                />
          <FLInput
                    name="currentPassword"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Current Password"
                />
            <label htmlFor="username" className="form-label">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              className="form-input"
              value={userPassword.currentPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="firstName" className="form-label">
              New password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              className="form-input"
              value={userPassword.newPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-input"
              value={userPassword.confirmPassword}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-full" type="submit">
              Submit
            </button>
          </form>
          <section className="mt-4">
            <hr className="mt-1 mb-4" />
          </section>
        </section>
      </main>
    </>
  );
}

export default ChangePassword;
