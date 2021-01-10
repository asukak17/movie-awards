import React, { useState } from "react";
import "./App.css";
import SearchBox from "./SearchBox";
import SearchResult, { IResponse } from "./SearchResult";

function App() {
  const [searchResult, setSearchResult] = useState<IResponse | null>(null);
  function handleSearchResult(data: IResponse) {
    setSearchResult(data);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Shoppies</h1>
        <SearchBox onResultChange={handleSearchResult} />
      </header>
      <body>
        <SearchResult searchResult={searchResult} />
        {/* <Nominations /> */}
      </body>
    </div>
  );
}

export default App;
