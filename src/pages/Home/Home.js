import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import Header from "../../components/Header";
import { authSelector } from "../../redux/auth/auth-selectors";

import { Redirect } from "react-router-dom";
import * as ROUTES from "../../routes";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  return (
    <main className="p-4">
      <Header />
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">
            Hello {currentUser.firstName || currentUser.email}
          </h1>
        ) : (
          <Redirect to={ROUTES.LOGIN} />
        )}
        <button className = "button">Change Password</button>
      </section>
    </main>
  );
}

export default Home;
