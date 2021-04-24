import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";

function Home() {
  const { currentUser } = useSelector(authSelector);

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div>
            <h1>Hello {currentUser.firstName || currentUser.email}</h1>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
