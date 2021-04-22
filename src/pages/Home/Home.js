import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";
import { Redirect } from "react-router-dom";
import * as ROUTES from "../../routes";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  return (
    <main>
      <Navbar />
      <section>
        {isAuthenticated ? (
          <div>
            <h1>Hello {currentUser.firstName || currentUser.email}</h1>
          </div>
        ) : (
          <Redirect to={ROUTES.LOGIN}></Redirect>
        )}
      </section>
    </main>
  );
}

export default Home;
