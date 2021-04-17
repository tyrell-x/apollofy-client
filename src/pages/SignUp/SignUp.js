import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

import "./SignUp.scss";

import Button from "../../components/Button";
import FLInput from "../../components/FLInput";
import * as ROUTES from "../../routes";

import {
  resetAuthState
} from "../../redux/auth/auth-actions";

import { authSelector } from "../../redux/auth/auth-selectors";

function SignUp() {
  const dispatch = useDispatch();
  const { isSigningUp, signUpError, isAuthenticated } = useSelector(
    authSelector,
  );

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  useEffect(() => {
    dispatch(resetAuthState());
  }, [dispatch]);

  if (isAuthenticated) {
    return <Redirect to={ROUTES.HOME} />;
  }

  return (
    <>
      <main className="signup">
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
                rules={{ maxLength: {
                  value: 20,
                  message: "Max length exceeded (20)"
                }}}
                error={errors?.firstName}
                label="first name"
                type="text"
              />
              
              <FLInput
                name="lastName"
                register={register}
                rules={{ maxLength: {
                  value: 20,
                  message: "Max length exceeded (20)"
                }}}
                error={errors?.lastName}
                label="last name"
                type="text"
              />
            </div>
            <FLInput
              name="email"
              register={register}
              rules={{
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Entered value does not match email format"
                }
              }}
              error={errors?.email}
              label="email"
              type="text"
            />
            <FLInput
              name="password"
              register={register}
              rules={{
                required: true
              }}
              label="password"
              type="password"
            />
            <FLInput
              name="repeatPassword"
              register={register}
              rules= {{
                  validate: value =>
                    value === watch("password") || "Las contraseñas no coinciden"
                }
              }
              error={errors?.repeatPassword}
              label="repeat password"
              type="password"
            />
            <FLInput
              name="phoneNumber"
              register={register}            
              label="phone number"
              type="text"
            />
            <Button
              style={{
                maxWidth: 150,
              }}
              type="submit"
              text="Sign up"
              disabled={isSigningUp}
            >
            </Button>
          </form>
          {signUpError && <section className="mt-4">{signUpError}</section>}
        </section>
      </main>
    </>
  );
}

export default SignUp;
