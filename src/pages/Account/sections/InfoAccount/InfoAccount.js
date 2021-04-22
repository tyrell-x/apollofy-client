import {useSelector} from "react-redux";
import { authSelector } from "../../../../redux/auth/auth-selectors";

import "./InfoAccount.scss";

function InfoAccount() {
  const { currentUser } = useSelector(authSelector);

  return (
    <div className="main_container__profileInfo">
      <article className="main_container__formInfo">
        <table className="main_container_profileInfo__table">
          <tbody>
            <tr className="main_container_profileInfo__data">
              <td>First Name</td>
              <td>{currentUser.firstName}</td>
            </tr>
            <tr className="main_container_profileInfo__data">
              <td>Last Name</td>
              <td>{currentUser.lastName}</td>
            </tr>
            <tr className="main_container_profileInfo__data">
              <td>Email</td>
              <td>{currentUser.email}</td>
            </tr>
            <tr className="main_container_profileInfo__data">
              <td>Phone Number</td>
              <td>{currentUser.phoneNumber}</td>
            </tr>
            <tr className="main_container_profileInfo__data">
              <td>Country</td>
              <td>{currentUser.locale}</td>
            </tr>
          </tbody>
        </table>
      </article>
    </div>
  );
}

export default InfoAccount;
