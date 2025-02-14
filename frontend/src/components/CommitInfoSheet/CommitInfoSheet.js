import React, { useEffect, useState, useRef } from 'react';
import CommitAPIHandler from "./CommitAPIHandler";
import Loading from "../Loading/Loading";
import './CommitInfoSheet.css';
import FileDirectory from "../FileFolder/FileDirectory";

export default function CommitInfoSheet(props) {
  const [loading, setLoading] = useState(true);
  const [commit, setCommit] = useState(null);
  const [files, setFiles] = useState([]);
  const [startCoord, setStartCoord] = useState({ x: 0, y: 0 });
  const[endCoord, setEndCoord] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await CommitAPIHandler(props.owner, props.repo, props.sha);
        setCommit(data);
        setFiles(data.files);
        setLoading(false);
      } catch {
        setLoading(false);
      }
    })();
  }, [props.owner, props.repo, props.sha]);

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setStartCoord({
        x: rect.right - 20,
        y: rect.top - rect.height / 2 - 5,
      });
      setEndCoord({
          x: startCoord.x - 100,
            y: startCoord.y + 75
      })
    }
  }, [loading, commit]);

  if (loading) {
    return <Loading />;
  }

  const onClick = () => {
    props.onSendData(false);
  };

  const authorDate = commit.author.date.substring(0, commit.author.date.indexOf('T'));
  const authorTime = commit.author.date.substring(
    commit.author.date.indexOf('T') + 1,
    commit.author.date.indexOf('Z')
  );

  const committerDate = commit.committer.date.substring(0, commit.committer.date.indexOf('T'));
  const committerTime = commit.committer.date.substring(
    commit.committer.date.indexOf('T') + 1,
    commit.committer.date.indexOf('Z')
  );

  return (
      <div className="info-sheet-container" ref={containerRef}>
          <button onClick={onClick} className="x">
              	&#8592;
          </button>
          <p className="git">
              <em>
                  <strong>git-commit</strong>
              </em>
          </p>
          <p className="sha">{commit.sha}</p>
          <h1 style={{marginBottom: "20px"}} className="title">
              {commit.message}
          </h1>
          <h3 className="info">Author</h3>
          <p className="person">
              <strong>{commit.author.name}</strong> ({commit.author.email}) on{" "}
              <strong>{authorDate}</strong> at <strong>{authorTime}</strong>
          </p>
          <h3 className="info">Committer</h3>
          <p style={{marginBottom: "20px"}} className="stopping-person">
              <strong>{commit.committer.name}</strong> ({commit.committer.email}) on{" "}
              <strong>{committerDate}</strong> at <strong>{committerTime}</strong>
          </p>
          <p className="top-stat">
              +: {commit.stats.additions}
          </p>
          <p className="bottom-stat" style={{marginBottom: "20px"}}>
              -: {commit.stats.deletions}
          </p>
          <h3>Files</h3>
          <FileDirectory directory={commit.root}/>
      </div>
  );
}