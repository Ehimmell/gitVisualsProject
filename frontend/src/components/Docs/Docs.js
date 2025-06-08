import { React, useEffect } from 'react';

import docsList from './docsList.json';

import SoloDoc from "./SoloDoc";

export default function Docs() {
    return(
        <div>
            {docsList?.map((doc, i) => (
                <SoloDoc key={i} json={doc}/>
            ))}
        </div>
    );
}