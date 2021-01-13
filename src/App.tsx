import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import "./App.css";
import Nominations from "./Nominations";
import SearchBox from "./SearchBox";
import SearchResult, { IResponse, IResult } from "./SearchResult";
import headerImage from "./header-image.svg";
function App() {
  const [searchResult, setSearchResult] = useState<IResponse | null>(null);
  const [nominations, setNominations] = useState<IResult[]>([]);
  const [nominationCompleted, setNominationCompleted] = useState<boolean>(false);

  useEffect(() => {
    setNominationCompleted(nominations.length >= 5);
  }, [nominations.length]);

  useEffect(() => {
    if (nominations.length) return;
    const savedNominations = localStorage.getItem("myNominations");
    if (!savedNominations) return;
    setNominations(JSON.parse(savedNominations));
  }, []);

  function handleSearchResult(data: IResponse) {
    setSearchResult(data);
  }

  function handleNominationChange(movie: IResult) {
    const matchedMovie = nominations.find((result: IResult) => result.imdbID === movie.imdbID);
    if (matchedMovie) return;
    setNominations((nominations) => [...nominations, movie]);
    localStorage.setItem("myNominations", JSON.stringify([...nominations, movie]));
  }

  function handleRemoveNomination(movie: IResult) {
    setNominations((nominations) =>
      nominations.filter((nomination) => nomination.imdbID !== movie.imdbID)
    );
    localStorage.setItem(
      "myNominations",
      JSON.stringify(nominations.filter((nomination) => nomination.imdbID !== movie.imdbID))
    );
  }

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
        <SearchBox onResultChange={handleSearchResult} />
        <Nominations nominations={nominations} onNominationRemove={handleRemoveNomination} />
        <SearchResult
          nominationCompleted={nominationCompleted}
          searchResult={searchResult}
          nominations={nominations}
          onNominationChange={handleNominationChange}
        />
      </main>
    </div>
  );
}

export default App;
