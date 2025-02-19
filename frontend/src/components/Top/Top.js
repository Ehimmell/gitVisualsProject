import React from 'react';
import './Top.css';

export default function Top({ handlePage }) {

  const handlePageChange = (newPage) => {
    if(handlePage) {
      handlePage(newPage);
    }
  };

  return (
    <div>
      <div className="top-tab">
        <h1><em>git-trees</em></h1>
        <p onClick={() => handlePageChange('home')}>Home</p>
        <p onClick={() => handlePageChange('search')}>Search</p>
        <p onClick={() => handlePageChange('docs')}>Docs</p>
        <p onClick = {() => handlePageChange('news')}>News</p>
      </div>
    </div>
  );
}