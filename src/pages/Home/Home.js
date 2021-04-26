import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";
import MusicPlayer from "../../components/MusicPlayer/index.js";

function Home() {
  const { currentUser } = useSelector(authSelector);

  return (
    <main>
      <Navbar />
      <section>
        <div>
          <h1>Hello {currentUser.firstName || currentUser.email}</h1>
        </div>
      </section>
      <section>
        <MusicPlayer />
      </section>
    </main>
  );
}

export default Home;
