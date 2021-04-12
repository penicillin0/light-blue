import React from 'react';
import './App.css';
import { UserNamesProvider } from './context/UserNamesContext';
import { RootPage } from './RootPage';

function App() {
  return (
    <div className="App">
      <UserNamesProvider>
        <RootPage></RootPage>
      </UserNamesProvider>
    </div>
  );
}

export default App;
