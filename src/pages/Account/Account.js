import { useSelector } from "react-redux";

import "./Account.scss";
import Header from "../../components/Header";
import TabMenu from "./TabMenu";
import Navbar from "../../components/Navbar";
const DEFAULT_PROFILE_IMAGE =
  "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg";

function Account() {
  const profile = useSelector((state) => state.auth.currentUser);

  return (
    <div className="account">
      <div className="tab-menu">
        <TabMenu />
      </div>
    </div>
  );
}

export default Account;
