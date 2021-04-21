import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/auth/auth-actions";
import "./ChangePassword.scss";
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





  return (
    <>
      <main className="changePassword">
        <section className="Login__wrapper">
          <hr className="mt-1 mb-4" />
          <form onSubmit={handleSubmit}>
          <FLInput
                    name="currentPassword"
                    id="currentPassword"
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
                    type="password"
                    
                />
          <FLInput
                    name="newPassword"
                    id="newPassword"
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
                    type="password"

                />
          <FLInput
                    name="confirmPassword"
                    id="confirmPassword"
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
                    type="password"

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
