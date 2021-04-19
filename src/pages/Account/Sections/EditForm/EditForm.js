import React from 'react';
import { useSelector } from "react-redux";

// import Tab from "../../../../components/TabComponents/Tab";
// import Tabs from "../../../../components/TabComponents/Tabs";

import Button from "../../../../components/Button";
import FLInput from "../../../../components/FLInput";
import "./EditForm.scss"

function EditForm() {
    // const profile = useSelector((state) => state.profile);
    // console.log(profile);

    // TODO: Este componente hay que cambiarlo de manera dinámica sin llevarselo a otra página diferente.
    return (
        <section>
            <form className="form_editProfile">
                <FLInput
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
                    name="phoneNumber"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Phone Number"
                />
                <FLInput
                    name="gender"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Gender"
                />
                <FLInput
                    name="country"
                    rules={{
                        maxLength: {
                        value: 20,
                        message: "Max length (20)",
                        },
                    }}
                    label="Country"
                />
                <Button
                    style={{
                        maxWidth: 150,
                    }}
                    type="submit"
                    text="Update"
                    // disabled={isSigningUp}
                />
            </form>
        </section>
    );
}

export default EditForm;