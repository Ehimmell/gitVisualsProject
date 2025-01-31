import React from 'react';
import './FileInfo.css';
import '../../utils/Capitalize'
import Capitalize from "../../utils/Capitalize";

export default function FileInfo(props) {
    const [pressed, setPressed] = React.useState(false);

    const onClick = () => {
        setPressed(!pressed);
    }
    if(!pressed) {
        return (
            <div>
                <button className= {"file-button"} onClick={onClick}>{props.title} &#8964;</button>
            </div>
        )
    }
    const titlePieces = props.title.split('/');
    const len = titlePieces.length;
    return(
        <div>
            <button className= {"file-button"} onClick={onClick}>{props.title} &#8963;</button>
            <div className={"file-container-1"}>
                <p className={"git"}><em><strong>git-file</strong></em></p>
                {titlePieces.slice(0, len - 1).map(piece => {
                    return (<p className={"file-path-li"}><strong>{piece}/</strong></p>)
                })}
                <h2 className={'file-name'}>{titlePieces[len - 1]}</h2>
                <p className={"divider"}>_____________</p>
                <h3>Status</h3>
                <p style={{color: props.status === 'added' ? 'green' : 'red'}}>{Capitalize(props.status)}</p>
                <p>_____________</p>
                <p style={{color: 'green'}}>+: {props.additions}</p>
                <p style={{color: 'red'}}>-: {props.deletions}</p>
                <p>_____________</p>
                <a href={props.blob_url}>Blob</a>
                <p>_____________</p>
                <a href={props.raw_url}>Raw</a>
                <p>_____________</p>
                <a href={props.contents_url}>Contents</a>
            </div>
        </div>
    )
}