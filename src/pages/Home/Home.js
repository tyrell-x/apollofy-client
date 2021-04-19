import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Home.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { authSelector } from "../../redux/auth/auth-selectors";
import { statement } from "@babel/template";

import { Redirect } from "react-router-dom";


function Home() {
  console.log(process.env)
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  return (
    <main className="p-4">
      <Header />
      <section className="p-4">
        {isAuthenticated ? (
          <div>
            <h1 className="text-xl">Hello {currentUser.email}</h1>
            <h2>
              <Link to={ROUTES.PROFILE}>Profile</Link>
            </h2>
          </div>
        ) : (
          <div>
            <h1 className="text-xl">Hello</h1>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
