import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserAccount, updateUserAccountError } from "../../../../redux/auth/auth-actions";
import { useForm } from "react-hook-form";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditAccount.scss";
import { useSelector } from "react-redux";
import { selectProfileState } from "../../../../redux/auth/auth-selectors"
import FLSelect from "../../../../components/FLSelect/FLSelect";

function EditAccount() {
  const dispatch = useDispatch();

  useEffect(() => {});
  const {
    handleSubmit,
  } = useForm();

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

  const onSubmit = (data) => {
    const { ...userData } = data;
    dispatch(updateUserAccount(userData));
  };


  return (
    <section className="edit-account">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FLInput
          name="firstName"
          value={data?.firstName || ""}
          onChange={handleInput}
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
