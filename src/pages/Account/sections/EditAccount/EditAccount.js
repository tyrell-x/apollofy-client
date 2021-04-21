import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateUserAccount } from "../../../../redux/auth/auth-actions";
import { useForm } from "react-hook-form";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditAccount.scss";

function EditAccount() {
  const dispatch = useDispatch();

  useEffect(() => {});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { ...userData } = data;
    dispatch(updateUserAccount(userData));
  };

  return (
    <section class="edit-account">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <FLInput
          register={register}
          name="firstName"
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.firstName}
          label="First Name"
        />
        <FLInput
          register={register}
          name="lastName"
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.lastName}
          label="Last Name"
        />
        <FLInput
          register={register}
          name="email"
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.email}
          label="Email"
        />
        <FLInput
          register={register}
          name="phoneNumber"
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.phoneNumber}
          label="PhoneNumber"
        />
        <FLInput
          register={register}
          name="country"
          rules={{
            maxLength: {
              value: 20,
              message: "Max length (20)",
            },
          }}
          error={errors?.country}
          label="Country"
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
