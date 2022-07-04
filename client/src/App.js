import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import Contest from './pages/Contests';
import CreateContest from './pages/CreateContest';
import ContestDetails from './pages/ContestDetails';
import CreateCandidate from './pages/CreateCandidate';
import Login from "./pages/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/contest" element={<Contest />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/create" element={<CreateContest />}/>
          <Route path="/contest/:id" element={<ContestDetails />}/>
          <Route path="/contest/:id/create" element={<CreateCandidate />}/>
        </Routes>
      </Router> 
  );
}

export default App;
