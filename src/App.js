import React from "react";
import PlayerList from "./PlayerList/PlayerList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamSelector from "./PlayerList/TeamSelector";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <h2 className="heading">TEAM SELECTION APP</h2>

        <Routes>
       
          <Route path="/" element={<PlayerList />} />
          <Route path="/team" element={<TeamSelector />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
