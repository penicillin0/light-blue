import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Top } from "./pages/Top";

function App() {
  const [userName, setUserName] = React.useState<string>("");

  console.log({ userName });

  const handleUserName = (userName: string) => {
    if (userName === "") return;
    setUserName(userName);
  };

  return (
    <div className="App">
      <Header />
      {userName === "" ? (
        <Top handleUserName={handleUserName} />
      ) : (
        <div>こんにちは{userName} さん</div>
      )}
    </div>
  );
}

export default App;
