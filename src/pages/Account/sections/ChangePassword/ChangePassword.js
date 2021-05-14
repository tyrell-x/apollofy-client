import { useState } from "react";
import { useDispatch } from "react-redux";
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
    <div className="changePassword">
      <form onSubmit={handleSubmit} className="form">
        <FLInput
          name="current"
          id="currentPassword"
          label="Current Password"
          onChange={handleChange}
          value={userPassword.current}
          required
          className="form-input"
          type="password"
        />
        <FLInput
          name="new"
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
          name="newRepeated"
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
          style={{
            maxWidth: 150,
          }}
          type="submit"
          text="Change Password"
        />
      </form>
    </div>
  );
}

export default ChangePassword;
