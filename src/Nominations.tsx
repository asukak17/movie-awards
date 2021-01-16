import React, { useContext } from "react";
import "./App.css";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { IResult } from "./SearchResult";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";
import { Color } from "./color.enum";

function Nominations() {
  const {
    state: { nominations },
    dispatch,
  } = useContext(AppContext);

  function onNominationRemove(movie: IResult) {
    dispatch({ type: Types.removeNomination, payload: movie });
    localStorage.setItem(
      "myNominations",
      JSON.stringify(nominations.filter((nomination) => nomination.imdbID !== movie.imdbID))
    );
  }

  function showSearchResult() {
    return nominations?.map((result) => (
      <Card
        style={{ background: Color.lightBg }}
        variant="elevation"
        className="nomination-card"
        key={result.imdbID}
      >
        <CardMedia
          component="img"
          alt={result.Title}
          height={100}
          image={result.Poster}
          title={result.Title}
        />
        <CardContent style={{ color: Color.darkText, height: "100px" }} className="card-content">
          <p>
            <strong>{result.Title}</strong>
            {result.Year}
          </p>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            className="remove-button"
            variant="outlined"
            size="small"
            style={{ color: Color.darkText }}
            onClick={() => onNominationRemove(result)}
          >
            Remove this
          </Button>
        </CardActions>
      </Card>
    ));
  }

  function showNoNominations() {
    return (
      <Card style={{ background: Color.lightBg }} variant="elevation" className="result-card">
        <CardContent style={{ color: Color.darkText }}>
          <p>No nominations picked yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <section>
      <h2>Nomination list</h2>
      <div className="nominations-container">
        {nominations.length ? showSearchResult() : showNoNominations()}
      </div>
    </section>
  );
}

export default Nominations;
