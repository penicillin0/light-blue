import React from "react";

import "./App.css";
import { Header } from "./components/Header";
import { Top } from "./pages/Top";

function App() {
  return (
    <div className="App">
      <Header>
        <Top />
      </Header>
    </div>
  );
}

export default App;
