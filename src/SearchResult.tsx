import React from "react";
import "./App.css";
import { Button, Card, CardActions, CardContent, CardMedia } from "@material-ui/core";

type Props = {
  searchResult: IResponse | null;
  onNominationChange: (result: IResult) => void;
};

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
  Search?: Array<IResult>;
  totalResults?: string;
  Response: string;
  Error?: string;
}

function SearchResult({ searchResult, onNominationChange }: Props) {
  if (!searchResult || searchResult.Error) return <></>;
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
          <Button size="small" color="primary" onClick={() => onNominationChange(result)}>
            Nominate this
          </Button>
        </CardActions>
      </Card>
    ));
  }
  return (
    <div className="Search-box">
      <h2>Results from search</h2>
      {showSearchResult()}
    </div>
  );
}

export default SearchResult;
