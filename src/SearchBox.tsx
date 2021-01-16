import React, { ChangeEvent, useContext, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./App.css";
import { IResponse } from "./SearchResult";
import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";
import { useHistory } from "react-router-dom";
import { Color } from "./color.enum";

function SearchBox() {
  const { dispatch } = useContext(AppContext);
  let history = useHistory();

  const [searchKey, setSearchKey] = useState<string>("");
  async function handleChange(typedKeyword: string) {
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

  function handleSubmit(event: any) {
    if (event.key === "Enter") {
      event.preventDefault();
      history.push("/");
    }
  }
  return (
    <section className="Search-box">
      <h2>Search Movies</h2>
      <TextField
        variant="outlined"
        style={{ color: Color.lightText }}
        onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
          handleChange(e.target.value)
        }
        onKeyPress={handleSubmit}
        value={searchKey}
        label="Movie Title"
        InputProps={{
          startAdornment: (
            <IconButton>
              <Search />
            </IconButton>
          ),
          style: { color: Color.lightText },
        }}
      />
    </section>
  );
}

export default SearchBox;
