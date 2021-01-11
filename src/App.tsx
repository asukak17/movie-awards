import { Alert } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import "./App.css";
import Nominations from "./Nominations";
import SearchBox from "./SearchBox";
import SearchResult, { IResponse, IResult } from "./SearchResult";

function App() {
  const [searchResult, setSearchResult] = useState<IResponse | null>(null);
  const [nominations, setNominations] = useState<IResult[]>([]);
  const [nominationCompleted, setNominationCompleted] = useState<boolean>(false);

  useEffect(() => {
    setNominationCompleted(nominations.length >= 5);
  }, [nominations]);

  function handleSearchResult(data: IResponse) {
    setSearchResult(data);
  }

  function handleNominationChange(movie: IResult) {
    const matchedMovie = nominations.find((result: IResult) => result.imdbID === movie.imdbID);
    if (matchedMovie) return;
    setNominations((nominations) => [...nominations, movie]);
  }

  function handleRemoveNomination(movie: IResult) {
    setNominations((nominations) =>
      nominations.filter((nomination) => nomination.imdbID !== movie.imdbID)
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>The Shoppies</h1>
        {nominationCompleted && (
          <Alert elevation={6} variant="filled" severity="success">
            5 nominations picked!
          </Alert>
        )}
        <SearchBox onResultChange={handleSearchResult} />
      </header>
      <main>
        <SearchResult
          nominationCompleted={nominationCompleted}
          searchResult={searchResult}
          nominations={nominations}
          onNominationChange={handleNominationChange}
        />
        <Nominations nominations={nominations} onNominationRemove={handleRemoveNomination} />
      </main>
    </div>
  );
}

export default App;
