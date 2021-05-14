import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector, currentUserSelector } from "../../redux/auth/auth-selectors";
import MusicPlayer from "../../components/MusicPlayer/index.js";

function Home() {
  const currentUser = useSelector(currentUserSelector);

  return (
    <div>
      <section>
        <div>
          <h1>Hello {currentUser.firstName || currentUser.email}</h1>
        </div>
      </section>
    </div>
  );
}

export default Home;
