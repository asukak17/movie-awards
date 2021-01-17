import React from "react";
import headerImage from "../Assets/header-image.svg";

const Home = () => (
  <header className="App-header">
    <h1>
      The Shoppies
      <img src={headerImage} width={100} height={100} alt="mission impossible" />
    </h1>
    <p style={{ fontSize: "16px" }}>Choose your 5 best movies</p>
  </header>
);

export default Home;
