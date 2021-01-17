import React, { useContext } from "react";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { AppContext } from "../Context/context";
import { Color, ActionTypes, IResult } from "../Types";

function Nominations() {
  const {
    state: { nominations },
    dispatch,
  } = useContext(AppContext);

  function onNominationRemove(movie: IResult) {
    dispatch({ type: ActionTypes.removeNomination, payload: movie });
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
          <strong>{result.Title}</strong>
          <p>{result.Year}</p>
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
