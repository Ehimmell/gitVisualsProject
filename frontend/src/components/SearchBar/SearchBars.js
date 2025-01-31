import React from 'react';
import './SearchBars.css';

export default function SearchBars({ owner, setOwner, repo, setRepo, onKeyDown, onClear }) {
    return (
        <div className="container-1">
            <div className="searchbars-container-1">
                <h3 className="search-title">Search-a-Tree</h3>
            </div>
            <div className="searchbars-container-1">
                <input
                    id="owner"
                    type="text"
                    placeholder="Owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                    onKeyDown={onKeyDown}
                />

                <input
                    id="repo"
                    type="text"
                    placeholder="Repo"
                    value={repo}
                    onChange={(e) => setRepo(e.target.value)}
                    onKeyDown={onKeyDown}
                />

                <button
                    className="unstyled-clear-1"
                    id="clear"
                    onClick={onClear}
                >
                    <u>Clear tree</u>
                </button>
            </div>
        </div>
    );
}