import React, { useContext } from "react";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { AppContext } from "../Context/context";
import { ActionTypes, Color, IResult } from "../Types";

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
    dispatch({ type: ActionTypes.addNomination, payload: movie });
    localStorage.setItem("myNominations", JSON.stringify([...nominations, movie]));
  }

  function showSearchResult() {
    return searchResult?.Search?.map((result) => (
      <Card
        style={{ background: Color.lightBg, width: "200px" }}
        variant="elevation"
        className="result-card"
        key={result.imdbID}
      >
        <CardMedia
          component="img"
          alt={result.Title}
          height={140}
          image={result.Poster}
          title={result.Title}
        />
        <CardContent style={{ color: Color.darkText, height: "100px" }}>
          <strong>{result.Title}</strong>
          <p>{result.Year}</p>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            disabled={isNominated(result) || nominationCompleted}
            size="small"
            color="primary"
            variant="outlined"
            onClick={() => onNominationChange(result)}
            style={{
              color:
                isNominated(result) || nominationCompleted ? Color.disabledText : Color.darkText,
            }}
          >
            Nominate this
          </Button>
        </CardActions>
      </Card>
    ));
  }

  function showNoResult() {
    return (
      <Card style={{ background: Color.lightBg }} variant="elevation" className="result-card">
        <CardContent style={{ color: Color.darkText }}>
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
