import React from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../routes";

import "./Account.scss";
import Header from "../../components/Header";

function Account() {
    return (
        <>
        <Header/>
        <main className="main_container">
            <div className="main_container__profileImg">
                <img
                src="http://dummyimage.com/50x50/fff/000.gif&text=Profile"

                ></img>
                <button>Change Image</button>
            </div>
            <div className="main_container__nav">
                <button>Personal information</button>
                <button>Change Password</button>
            </div>
            <div className="main_container__profileInfo">
                <article className="main_container__formInfo">
                    <table className="main_container_profileInfo__table">
                        <tbody>
                            <tr className="main_container_profileInfo__data">
                                <td>First Name</td>
                                <td>Wilmer</td>
                            </tr>
                            <tr className="main_container_profileInfo__data">
                                <td>Last Name</td>
                                <td>Sierra Salgado</td>
                            </tr>
                            <tr className="main_container_profileInfo__data">
                                <td>Email</td>
                                <td>wsierra010@gmail.com</td>
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
        </main>
        </>
    );
}

export default Account;
