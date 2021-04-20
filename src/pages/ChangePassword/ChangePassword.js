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
import Button from "../.././components/Button";



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

            onChange={handleChange}

            value={userPassword.currentPassword}

            required

            className="form-input"

            />

            <FLInput

            name="newPassword"

            rules={{

                maxLength: {

                value: 20,

                message: "Max length (20)",

                },

            }}

            label="New Password"

            onChange={handleChange}

            value={userPassword.newPassword}

            required

            className="form-input"

            />

            <FLInput

            name="confirmPassword"

            rules={{

                maxLength: {

                value: 20,

                message: "Max length (20)",

                },

            }}

            label="Confirm Password"

            onChange={handleChange}

            value={userPassword.confirmPassword}

            required

            className="form-input"

            />
            <Button
                        // onClick={handleSubmit}
                        style={{
                            maxWidth: 150,
                        }}
                        type="submit"
                        text="Change Password"
                        // disabled={isSigningUp}
                    />
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
