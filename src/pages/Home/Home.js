import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { authSelector } from "../../redux/auth/auth-selectors";
import { statement } from "@babel/template";

import { Redirect } from "react-router-dom";
import * as ROUTES from "../../routes";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
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
      </section>
    </main>
  );
}

export default Home;
