import "./Account.scss";
import TabMenu from "./TabMenu";

const DEFAULT_PROFILE_IMAGE =
  "http://apollo.eu-west-3.elasticbeanstalk.com/content/images/svg/default-user.svg";

function Account() {

  return (
    <div className="account">
      <div className="tab-menu">
        <TabMenu />
      </div>
    </div>
  );
}

export default Account;
