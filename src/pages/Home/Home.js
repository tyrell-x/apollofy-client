import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";
import MusicPlayer from "../../components/MusicPlayer/index.js";
import MockDragAndDrop from "../../components/MockDragAndDrop"

function Home() {
  const { currentUser } = useSelector(authSelector);

  return (
    <main>
      <Navbar />
      <section>
        <div>
          <h1>Hello {currentUser.firstName || currentUser.email}</h1>
        </div>
        <div>
          <h2>Mock Drag And Drop</h2>
          <MockDragAndDrop>
            
          </MockDragAndDrop>

        </div>

      </section>
      <section>
        <MusicPlayer />
      </section>
    </main>
  );
}

export default Home;
