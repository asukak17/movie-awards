import { Alert } from "@material-ui/lab";
import React, { useContext, useEffect } from "react";
import "./App.css";
import Nominations from "./Components/Nominations";
import SearchBox from "./Components/SearchBox";
import SearchResult from "./Components/SearchResult";
import { AppContext } from "./Context/context";
import { Types } from "./Context/types";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import SideBar from "./Components/Drawer";
function App() {
  const {
    state: { nominations, nominationCompleted },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: Types.setNominationCompleted, payload: nominations.length >= 5 });
    if (nominations.length) return;
    const savedNominations = localStorage.getItem("myNominations");
    if (!savedNominations || !dispatch) return;
    dispatch({ type: Types.setNominations, payload: JSON.parse(savedNominations) });
  }, [nominations.length, dispatch]);

  return (
    <Router>
      <Home />
      <main className="App">
        <SearchBox />
        <Route exact path="/">
          <SearchResult />
        </Route>
        <Route path="/nominations">
          <Nominations />
        </Route>
        <SideBar />
        <Alert
          className={`nomination-complete-toast ${nominationCompleted && "show"}`}
          elevation={6}
          variant="filled"
          severity="success"
        >
          5 nominations successfully picked!
        </Alert>
      </main>
    </Router>
  );
}

export default App;
