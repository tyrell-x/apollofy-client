import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./SignUp.scss";

import Button from "../../components/Button";
import FLInput from "../../components/FLInput";
import * as ROUTES from "../../routes";

import { resetAuthState } from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";
import { signUpWithEmailRequest } from "../../redux/auth/auth-actions";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { repeatPassword, ...userData } = data;
    dispatch(signUpWithEmailRequest(userData));
  };

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <div className="signup">
      <section className="signup__wrapper">
        <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <FLInput
              name="firstName"
              register={register}
              rules={{
                maxLength: {
                  value: 20,
                  message: "Max length (20)",
                },
              }}
              error={errors?.firstName}
              label="first name"
            />

            <FLInput
              name="familyName"
              register={register}
              rules={{
                maxLength: {
                  value: 20,
                  message: "Max length (20)",
                },
              }}
              error={errors?.lastName}
              label="last name"
            />
          </div>
          <FLInput
            name="email"
            register={register}
            rules={{
              required: true,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Entered value does not match email format",
              },
              maxLength: {
                value: 30,
                message: "Max length (30)",
              },
            }}
            error={errors?.email}
            label="email"
          />
          <FLInput
            name="password"
            register={register}
            rules={{
              required: true,
              minLength: {
                value: 6,
                message: "Min length (6)",
              },
              maxLength: {
                value: 20,
                message: "Min length (20)",
              },
            }}
            label="password"
            type="password"
          />
          <FLInput
            name="repeatPassword"
            register={register}
            rules={{
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            }}
            error={errors?.repeatPassword}
            label="repeat password"
            type="password"
          />
          <FLInput
            name="phoneNumber"
            register={register}
            rules={{
              pattern: {
                value: /^-?[0-9]\d*\.?\d*$/,
                message: "Must be composed of numbers",
              },
              maxLength: {
                value: 20,
                message: "Max length (20)",
              },
            }}
            label="phone number"
          />
          <Button
            style={{
              maxWidth: 150,
            }}
            type="submit"
            text="Sign up"
            disabled={isSigningUp}
          ></Button>
        </form>
        {signUpError && <section className="mt-4">{signUpError}</section>}
      </section>
    </div>
  );
}

export default SignUp;
