import React, { useState } from 'react';
import FileFolder from "./FileFolder";

function Directory({ directory }) {
  const [shown, setShown] = useState(false);

  const onClick = () => {
    setShown(!shown);
  };

  return (
    <div style={{ marginLeft: '10px', marginTop: '2px' }}>
      <button className="directory-button" onClick={onClick}>
        {directory.currentPath} /
      </button>
      {shown && (
        <>
          <FileFolder files={directory.files} />
          {directory.children && directory.children.length > 0 && (
            <div
              style={{
                marginTop: '2px',
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}
            >
              {directory.children.map((child, index) => (
                <Directory key={index} directory={child} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function FileDirectory({ directory }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
      }}
    >
      {directory.children &&
        directory.children.map((child, index) => (
          <Directory key={index} directory={child} />
        ))}
    </div>
  );
}