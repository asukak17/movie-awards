import React, { ChangeEvent, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { IResponse } from "./SearchResult";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";

function SearchBox() {
  const { dispatch } = useContext(AppContext);

  const [searchKey, setSearchKey] = useState<string>("");
  async function handleSubmit(typedKeyword: string) {
    setSearchKey(typedKeyword);
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${typedKeyword}&type=movie&page=1`
      );
      response.json().then((data: IResponse) => dispatch({ type: Types.setResult, payload: data }));
    } catch (err) {
      console.log("error", err);
    }
  }
  return (
    <section className="Search-box">
      <h2>Search Movies</h2>
      <form>
        <TextField
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleSubmit(e.target.value)
          }
          value={searchKey}
          label="Movie Title"
          InputProps={{
            startAdornment: (
              <IconButton>
                <Search />
              </IconButton>
            ),
          }}
        />
      </form>
    </section>
  );
}

export default SearchBox;
