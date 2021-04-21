import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../../routes";
import { profileSelector } from "../../../../redux/auth/auth-selectors";

function PersonalInformation(props) {
    console.log(props);
    const profile = useSelector(profileSelector);

    return(
        <div className="main_container__profileInfo">
            <article className="main_container__formInfo">
                <table className="main_container_profileInfo__table">
                    <tbody>
                        <tr className="main_container_profileInfo__data">
                            <td>First Name</td>
                            <td>{profile.firstName}</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Last Name</td>
                            <td>{profile.familyName}</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Email</td>
                            <td>{profile.email }</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Phone Number</td>
                            <td>{profile.phoneNumber}</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Country</td>
                            <td>{profile.locale}</td>
                        </tr>
                    </tbody>
                </table>
            </article>
            <article className="main_container_profileInfo_btn">
                <button 
                type="submit"
                className="main_container_profileInfo_btn__tag"
                >
                    <NavLink to={ROUTES.EDIT_PROFILE}>Edit information</NavLink>
                </button>
            </article>
        </div>
    );
}

export default PersonalInformation;