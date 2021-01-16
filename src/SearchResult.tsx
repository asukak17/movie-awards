import React, { useContext } from "react";
import "./App.css";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";

export interface IResult {
  Actors: string;
  Awards: string;
  BoxOffice: string;
  Country: string;
  DVD: string;
  Director: string;
  Genre: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Poster: string;
  Production: string;
  Rated: string;
  Ratings: Array<any>;
  Released: string;
  Response: string;
  Runtime: string;
  Title: string;
  Type: string;
  Website: string;
  Writer: string;
  Year: string;
  imdbID: string;
  imdbRating: string;
  imdbVotes: string;
}

export interface IResponse {
  Search?: IResult[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

function SearchResult() {
  const {
    dispatch,
    state: { nominations, searchResult, nominationCompleted },
  } = useContext(AppContext);

  function isNominated(result: IResult) {
    const nominatedMatch = nominations.find((nomination) => nomination.imdbID === result.imdbID);
    return nominatedMatch ? true : false;
  }

  function onNominationChange(movie: IResult) {
    const matchedMovie = nominations.find((result: IResult) => result.imdbID === movie.imdbID);
    if (matchedMovie) return;
    dispatch({ type: Types.addNomination, payload: movie });
    localStorage.setItem("myNominations", JSON.stringify([...nominations, movie]));
  }

  function showSearchResult() {
    return searchResult?.Search?.map((result) => (
      <Card variant="elevation" className="result-card" key={result.imdbID}>
        <CardMedia
          component="img"
          alt={result.Title}
          height={140}
          image={result.Poster}
          title={result.Title}
        />
        <CardContent>
          <p>
            <strong>{result.Title}</strong>
            {result.Year}
          </p>
        </CardContent>
        <CardActions>
          <Button
            disabled={isNominated(result) || nominationCompleted}
            size="small"
            color="primary"
            onClick={() => onNominationChange(result)}
          >
            Nominate this
          </Button>
        </CardActions>
      </Card>
    ));
  }

  function showNoResult() {
    return (
      <Card variant="elevation" className="result-card">
        <CardContent>
          <p>No results found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="Search-box">
      <h2>Results from search</h2>
      <div className="search-box-container">
        {!searchResult || searchResult.Error ? showNoResult() : showSearchResult()}
      </div>
    </section>
  );
}

export default SearchResult;
