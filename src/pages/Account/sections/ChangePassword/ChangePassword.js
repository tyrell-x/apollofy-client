import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../../../redux/auth/auth-actions";
import "./ChangePassword.scss";
import FLInput from "../../../../components/FLInput";
import Button from "../../../../components/Button";

function ChangePassword(props) {

  const dispatch = useDispatch();

  const [userPassword, setUserPassword] = useState({
    current: "",
    new: "",
    newRepeated: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (userPassword.new === userPassword.newRepeated) {
      dispatch(changePassword(userPassword));
    }
  }

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
                    label="Current Password"
                    onChange={handleChange}
                    value={userPassword.current}
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
                    value={userPassword.new}
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
                    value={userPassword.newRepeated}
                    required
                    className="form-input"
                    type="password"

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
