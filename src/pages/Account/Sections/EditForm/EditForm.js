import React, { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../../routes";
import { updateUserAccount } from "../../../../redux/auth/auth-actions"
import { useForm } from "react-hook-form";


import firebase from "firebase/app";
import "firebase/auth";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditForm.scss"

function EditForm() {
    const profile = useSelector((state) => state.auth.currentUser);
    // console.log(profile);
    const dispatch = useDispatch();

    useEffect(() => {

    })
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        const { ...userData } = data;
        dispatch(updateUserAccount(userData));
    };

    // TODO: Este componente hay que cambiarlo de manera dinámica sin llevarselo a otra página diferente.
    
    return (
        <section>
            <form className="form_editProfile" onSubmit={handleSubmit(onSubmit)}>
                <FLInput
                register={register}
                    className="firstName"
                    name="firstName"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // error={errors?.firstName}
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
                    label="Country"
                />
                {/* <NavLink to={ROUTES.ACCOUNT}> */}
                    <Button
                        style={{
                            maxWidth: 150,
                        }}
                        type="submit"
                        text="Update"
                        // disabled={isSigningUp}
                    />
                {/* </NavLink> */}
            </form>
        </section>
    );
}

export default EditForm;