import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAccount } from "../../../../redux/auth/auth-actions";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditAccount.scss";
import { useSelector } from "react-redux";
import { selectProfileState } from "../../../../redux/auth/auth-selectors"

function EditAccount() {
  const dispatch = useDispatch();

  const user = useSelector(selectProfileState);

  const [ data, setData ] = useState(user);

  const handleInput = e => {
    setData((currentData) => {
      currentData[e.target.name] = e.target.value
      return {
        ...currentData
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(updateUserAccount(data));
  };


  return (
    <section className="edit-account">
      <form className="form" onSubmit={onSubmit}>
        <FLInput
          name="firstName"
          onChange={handleInput}
          value={data.firstName || ""}
          label="First Name"
        />
        <FLInput
          name="lastName"
          value={data?.lastName || ""}
          onChange={handleInput}
          label="Last Name"
        />
        <FLInput
          name="email"
          value={data?.email || ""}
          onChange={handleInput}
          label="Email"
        />
        <FLInput
          name="phoneNumber"
          value={data?.phoneNumber || ""}
          onChange={handleInput}
          label="PhoneNumber"
        />
        <Button
          style={{
            maxWidth: 150,
          }}
          type="submit"
          text="Update"
        />
      </form>
    </section>
  );
}

export default EditAccount;
