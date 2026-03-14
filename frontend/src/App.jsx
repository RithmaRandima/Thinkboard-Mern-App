import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import Navbar from "./components/Navbar";
import "./App.css";
const App = () => {
  const [currentStatus, setCurrentStatus] = useState("create");
  return (
    <div className="app">
      <Navbar
        currentStatus={currentStatus}
        setCurrentStatus={setCurrentStatus}
      />
      <Routes>
        <Route
          path="/"
          element={<HomePage setCurrentStatus={setCurrentStatus} />}
        />
        <Route
          path="/create"
          element={<CreatePage setCurrentStatus={setCurrentStatus} />}
        />
        <Route
          path="/notes/:id"
          element={<NoteDetailPage setCurrentStatus={setCurrentStatus} />}
        />
      </Routes>
    </div>
  );
};

export default App;
