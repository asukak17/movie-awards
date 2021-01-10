import React, { ChangeEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./App.css";

function SearchBox() {
  const [searchKey, setSearchKey] = useState<string>("");
  async function handleSubmit(typedKeyword: string) {
    setSearchKey(typedKeyword);
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&t=${typedKeyword}`
    );
    response.json().then((data) => console.log("data", data));
  }
  return (
    <div className="Search-box">
      <form>
        <TextField
          onChange={(e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
            handleSubmit(e.target.value)
          }
          value={searchKey}
          label="Movie Title"
          defaultValue="Hello World"
        />
      </form>
    </div>
  );
}

export default SearchBox;
