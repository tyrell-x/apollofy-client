import React from "react";
import { useSelector } from "react-redux";

import "./Home.scss";
// import Header from "../../components/Header";
import { authSelector } from "../../redux/auth/auth-selectors";
import Header from "../../components/Header";

function Home() {
  const { isAuthenticated, currentUser } = useSelector(authSelector);

  const prove = (
    <main className="p-4">
      <section className="p-4">
        {isAuthenticated ? (
          <h1 className="text-xl">Hello Out {currentUser.email}</h1>
        ) : (
          <h1 className="text-xl">Hello World Login</h1>
        )}
      </section>
    </main>
  );

  // TODO: REVISAR PORQUE LA ETIQUETA MAIN NO FUNCIONA Y DEJA DE COMPILAR
  return (
    <header>
      <Header/>
    </header>

  );
    // <main className="p-4">
    //   <section className="p-4">
    //     {isAuthenticated ? (
    //       <h1 className="text-xl">Hello Out{currentUser.email}</h1>
    //     ) : (
    //       <h1 className="text-xl">Hello World Login</h1>
    //     )}
    //   </section>
    // </main>
}

export default Home;
