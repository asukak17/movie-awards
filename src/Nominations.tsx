import React from "react";
import "./App.css";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";
import { IResult } from "./SearchResult";

type Props = {
  nominations: IResult[];
  onNominationRemove: (result: IResult) => void;
};

function SearchResult({ nominations, onNominationRemove }: Props) {
  if (!nominations.length) return <></>;
  function showSearchResult() {
    console.log(nominations);
    return nominations?.map((result) => (
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
          <Button size="small" color="primary" onClick={() => onNominationRemove(result)}>
            Remove this
          </Button>
        </CardActions>
      </Card>
    ));
  }
  return (
    <div className="nominations">
      <h2>Nomination list</h2>
      {showSearchResult()}
    </div>
  );
}

export default SearchResult;
