import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";
import * as ROUTES from "../../routes";
import {useSelector, useDispatch} from "react-redux";
import {getUserData} from "../../redux/profile/profile-actions";
import PersonalInformation from "./Sections/PersonalInformation";

import "./Account.scss";
import Header from "../../components/Header";
import TabMenu from "./Sections/TabMenu";

function Account() {
    const profile = useSelector((state) => state.profile);
    console.log(profile);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserData())
    }, []);

    return (
        <>
        <Header/>
        <main className="main_container">
            <div className="main_container__profileImg">
                <img
                src={profile.data.imageUrl ? profile.data.imageUrl : "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg"}
                className="main_container__icon"
                >
                </img>
                <button>Change Image</button>
            </div>
            <TabMenu/>
        </main>

        </>
    );
}

export default Account;
