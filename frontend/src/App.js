import React, { useState } from "react";
import Top from './components/Top/Top';
import './App.css';
import Network from "./components/Network/Network";
import SearchBars from "./components/SearchBar/SearchBars";
import CommitInfoSheet from "./components/CommitInfoSheet/CommitInfoSheet";

function App() {
  const [owner, setOwner] = useState('');
  const [repo, setRepo] = useState('');
  const [showNetwork, setShowNetwork] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (owner.trim() !== '' && repo.trim() !== '') {
        setShowNetwork(true);
      }
    }
  };

  const handleClear = () => {
    setShowNetwork(false);
    setOwner('');
    setRepo('');
  };

  return (
    <div>
      <Top />
      <SearchBars
        owner={owner}
        setOwner={setOwner}
        repo={repo}
        setRepo={setRepo}
        onKeyDown={handleKeyDown}
        onClear={handleClear}
      />
      {showNetwork && <Network owner={owner} repo={repo} />}
    </div>
  );
}

export default App;