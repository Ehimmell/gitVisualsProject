import React from 'react';
import './FileInfo.css';
import '../../utils/Capitalize'
import Capitalize from "../../utils/Capitalize";
import '../CommitInfoSheet/CommitInfoSheet.css';

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
                <h2 style={{marginBottom:"20px"}} className={'file-name'}>{titlePieces[len - 1]}</h2>
                <h3 className={'info'}>Status</h3>
                <p className={props.status==="added" ? 'top-stat' : 'bottom-stat'}
                   style={{marginBottom:"20px", marginTop:"0"}}>{Capitalize(props.status)}</p>
                <p className={'top-stat'}>+: {props.additions}</p>
                <p style={{marginBottom:"20px"}} className={'bottom-stat'}>-: {props.deletions}</p>
                <p>
                    <a href={props.blob_url}>Blob</a>
                    &nbsp;⋅&nbsp;
                    <a href={props.raw_url}>Raw</a>
                    &nbsp;⋅&nbsp;
                    <a href={props.contents_url}>Contents</a>
                </p>
            </div>
        </div>
    )
}