import { useSelector } from "react-redux";
import "./Home.scss";
import Navbar from "../../components/Navbar";
import { authSelector } from "../../redux/auth/auth-selectors";
import FLSelect from "../../components/FLSelect/FLSelect.js";
import { useState } from "react";

function Home() {
  const { currentUser } = useSelector(authSelector);

  return (
    <>
      <Navbar />
      <main>
        <section>
          <div>
            <h1>Hello {currentUser.firstName || currentUser.email}</h1>
            <FLSelect
              style={{
                width: 200,
              }}
              label="select"
              options={[
                {
                  label: "Option 1",
                  value: "option1",
                },
                {
                  label: "Option 2",
                  value: "option1",
                },
                {
                  label: "Option 3",
                  value: "option1",
                },
                {
                  label: "Option 4",
                  value: "option1",
                },
                {
                  label: "Option 5",
                  value: "option1",
                },
              ]}
            ></FLSelect>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
