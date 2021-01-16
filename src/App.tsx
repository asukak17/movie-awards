import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Nominations from "./Nominations";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import headerImage from "./header-image.svg";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";

function App() {
  const {
    state: { nominations },
    dispatch,
  } = useContext(AppContext);

  const [nominationCompleted, setNominationCompleted] = useState<boolean>(false);

  useEffect(() => {
    setNominationCompleted(nominations.length >= 5);
  }, [nominations.length]);

  useEffect(() => {
    if (nominations.length) return;
    const savedNominations = localStorage.getItem("myNominations");
    if (!savedNominations) return;
    dispatch({ type: Types.setNominations, payload: JSON.parse(savedNominations) });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          The Shoppies
          <img src={headerImage} width={100} height={100} alt="mission impossible" />
        </h1>
      </header>
      <main>
        {nominationCompleted && (
          <Alert elevation={6} variant="filled" severity="success">
            5 nominations picked!
          </Alert>
        )}
        <h3>Choose your 5 best movies</h3>
        <SearchBox />
        <Nominations />
        <SearchResult />
      </main>
    </div>
  );
}

export default App;
