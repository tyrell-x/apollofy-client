import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../../redux/actions/index";
import "./Home.scss";
import Header from "../../components/Header";
import * as ROUTES from "../../routes";
import { authSelector } from "../../redux/auth/auth-selectors";
import { statement } from "@babel/template";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
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
            <h1 className="text-xl">{counter}</h1>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
