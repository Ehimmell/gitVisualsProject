import {React, useEffect, useState} from 'react';

import docsList from './docsList.json';

import './Docs.css';

import SoloDoc from "./SoloDoc";


export default function Docs() {

    const [openDoc, setOpenDoc] = useState(null);

    return (
        <div>
            <div className={"docs-container"}>
                {docsList?.map((doc, i) => (
                    <SoloDoc setDoc={setOpenDoc} key={i} json={doc}/>
                ))}
            </div>
            {openDoc}
        </div>
    );
}