import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../../routes";


import firebase from "firebase/app";
import "firebase/auth";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditForm.scss"

function EditForm() {
    // const profile = useSelector((state) => state.auth.currentUser);
    // console.log(profile);

    const handleSubmit = () => {
        // const profile = useSelector((state) => state.profile);
        // const name = name.value;
        // const name = document.querySelector('.firstName');
        // console.log(name);

    }

    // TODO: Este componente hay que cambiarlo de manera dinámica sin llevarselo a otra página diferente.
    const user = firebase.auth().currentUser;
    console.log(user);
    // const profile = useSelector((state) => state.auth.currentUser);
    // console.log(profile);
    // console.log(profile.data.email);
    return (
        <section>
            <form className="form_editProfile">
                <FLInput
                    className="firstName"
                    name="firstName"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // error={errors?.firstName}
                    // label={profile.firstName}
                />
                <FLInput
                    name="lastName"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // label={profile.familyName}
                />
                <FLInput
                    name="email"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // label={profile.email}
                />
                <FLInput
                    name="phoneNumber"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // label={profile.phoneNumber}
                />
                <FLInput
                    name="gender"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // label={profile.data.createdBy}
                />
                <FLInput
                    name="country"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    // label={profile.locale}
                />
                <NavLink to={ROUTES.ACCOUNT}>
                    <Button
                        onClick={handleSubmit}
                        style={{
                            maxWidth: 150,
                        }}
                        type="submit"
                        text="Update"
                        // disabled={isSigningUp}
                    />
                </NavLink>
            </form>
        </section>
    );
}

export default EditForm;