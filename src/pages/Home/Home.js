import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";
import MusicPlayer from "../../components/MusicPlayer/index.js";
import MockDragAndDrop from "../../components/MockDragAndDrop"

function Home() {
  const { currentUser } = useSelector(authSelector);

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
