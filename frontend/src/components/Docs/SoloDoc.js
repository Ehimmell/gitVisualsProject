import {React, useEffect, useState} from 'react';

import './Docs.css';

export default function SoloDoc(props) {
    const [clicked, setClicked] = useState(false);
    const json = props.json;

    const openDoc =
        (
            <div className = {"open-doc-container"}>
                {json?.Sections?.map((section, i) => (
                    <div key={i}>
                        <h1 className={"solo-doc-body"}>{section.Header}</h1>
                        <p className={"solo-doc-body"}>{section.Body}</p>
                        {section.Grid != null &&
                            (
                                <table className={"solo-doc-body"}>
                                    <thead>
                                    <tr>
                                        <td>test row</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        section?.Grid?.map((item, j) => (
                                            <tr key={j}>
                                                <td>{item}</td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                ))}
            </div>
        )

    const setOpenDoc = () => {
        props.setDoc(openDoc);
    }

    return (
        <p onClick = {setOpenDoc} className={"solo-doc-body"}>{json.Title}</p>
    )
}