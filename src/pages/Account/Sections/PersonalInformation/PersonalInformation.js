import React, {useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {getUserData} from "../../../../redux/profile/profile-actions";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../../../routes";

function PersonalInformation() {
    const profile = useSelector((state) => state.profile);
    console.log(profile);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserData())
    }, []);

    return(
        <div className="main_container__profileInfo">
            <article className="main_container__formInfo">
                <table className="main_container_profileInfo__table">
                    <tbody>
                        <tr className="main_container_profileInfo__data">
                            <td>First Name</td>
                            <td>{profile.data.firstName}</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Last Name</td>
                            <td>{profile.data.lastName}</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Email</td>
                            <td>{profile.data.email }</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Phone Number</td>
                            <td>677 77 77 77</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Gender</td>
                            <td>Male</td>
                        </tr>
                        <tr className="main_container_profileInfo__data">
                            <td>Country</td>
                            <td>Spain</td>
                        </tr>
                    </tbody>
                </table>
            </article>
            <article className="main_container_profileInfo_btn">
                <button className="main_container_profileInfo_btn__tag">
                    <NavLink to={ROUTES.EDIT_PROFILE}>Edit information</NavLink>
                </button>
            </article>
        </div>
    );
}

export default PersonalInformation;