import { React } from 'react';
import './Docs.css';

export default function SoloDoc(props) {
    const json = props.json;

    const openDoc = (
        <div className={"open-doc-container"}>
            <h2 className={"solo-doc-header"}>{json.Title}</h2>
            <p className={"solo-doc-body"}>{json.Description}</p>
            {json?.Sections?.map((section, i) => (
                <div key={i}>
                    <h3 className={"solo-doc-header"}>{section.Header}</h3>
                    <p className={"solo-doc-body"}>{section.Body}</p>
                    {section.Grid != null && section.GridColumns != null && (
                        <div className={"solo-doc-body"}>
                            <table className={"table"}>
                                <thead>
                                    <tr>
                                        {section.GridColumns.map((column, j) => (
                                            <th key={j}>{column}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {section.Grid.map((row, j) => (
                                        <tr key={j}>
                                            {row.map((cell, k) => (
                                                <td key={k}>{cell}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );

    const setOpenDoc = () => {
        props.setDoc(openDoc);
    };

    return (
        <p onClick={setOpenDoc} className={"solo-doc-body"}>
            {json.Title}
        </p>
    );
}