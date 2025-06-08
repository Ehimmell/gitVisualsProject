import {React, useEffect, useState} from 'react';

export default function SoloDoc(props) {
    const json = props.json;

    return (
        <div>
            {json?.Sections?.map((section, i) => (
                <div key={i}>
                    <h1>{section.Header}</h1>
                    <p>{section.Body}</p>
                    {section.Grid != null &&
                        (
                            <table>
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
}