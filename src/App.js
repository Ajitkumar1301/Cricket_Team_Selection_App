import React from "react";
import PlayerList from "./PlayerList/PlayerList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamSelector from "./PlayerList/TeamSelector";
import SquadList from './PlayerList/SquadList'

const App = () => {
  return (
    <>
      <BrowserRouter>
   

        <Routes>

          <Route path="/" element={<PlayerList />} />
          <Route path="/team" element={<TeamSelector />} />
          <Route path="/final" element={<SquadList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
