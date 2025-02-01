import React from 'react';
import './FileFolder.css';
import FileInfo from "../File/FileInfo";

export default function FileFolder(props) {
  return (
    <div className="file-folder-container">
      {props.name && <h1 className="file-folder-title">{props.name}</h1>}
      <ul className="file-folder-list">
        {props.files.map((file, index) => (
          <li key={index} className="file-folder-list-item">
            <FileInfo
              title={file.filename}
              status={file.status}
              additions={file.additions}
              deletions={file.deletions}
              changes={file.changes}
              blob_url={file.blob_url}
              raw_url={file.raw_url}
              contents_url={file.contents_url}
              patch={file.patch}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}