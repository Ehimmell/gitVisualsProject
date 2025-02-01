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
                <h2 className={'file-name'}>{titlePieces[len - 1]}</h2>
                <p className={"divider"}>_____________</p>
                <h3 className={'info'}>Status</h3>
                <p className={'stopping-person'}
                   style={{color: props.status === 'added' ? 'green' : 'red'}}>{Capitalize(props.status)}</p>
                <p className={'divider'}>_____________</p>
                <p style={{color: 'green'}} className={'top-stat'}>+: {props.additions}</p>
                <p style={{color: 'red'}} className={'bottom-stat'}>-: {props.deletions}</p>
                <p className={'divider'}>_____________</p>
                <p>
                    <a href={props.blob_url}>Blob</a>
                    &nbsp;⋅&nbsp;
                    <a href={props.raw_url}>Raw</a>
                    &nbsp;⋅&nbsp;
                    <a href={props.contents_url}>Contents</a>
                </p>
            </div>
        </div>

        // <div className={"info-sheet-container"}>
        //     <p className={'git'}><em><strong>git-file</strong></em></p>
        //     <p className={'sha'}>{commit.sha}</p>
        //     <h1 className={'title'}>{commit.message}</h1>
        //     <p className={'divider'}>_____________</p>
        //     <h3 className={'info'}>Author</h3>
        //     <p className={'person'}><strong>{commit.author.name}</strong> ({commit.author.email})
        //         on <strong>{authorDate}</strong> at <strong>{authorTime}</strong></p>
        //     <h3 className={'info'}>Committer</h3>
        //     <p className={'stopping-person'}><strong>{commit.committer.name}</strong> ({commit.committer.email})
        //         on <strong>{committerDate}</strong> at <strong>{committerTime}</strong></p>
        //     <p className={'divider'}>_____________</p>
        //     <p className={'top-stat'} style={{color: 'green'}}>+: {commit.stats.additions}</p>
        //     <p className={'bottom-stat'} style={{color: 'red'}}>-: {commit.stats.deletions}</p>
        //     <p className={'divider'}>_____________</p>
        //     <h3>Files</h3>
        //     <ul>
        //         {files.map(file => {
        //             return (
        //                 <li className={"files-list"} key={file.sha}>
        //                     <FileInfo
        //                         title={file.filename} status={file.status} additions={file.additions}
        //                         deletions={file.deletions} changes={file.changes} blob_url={file.blob_url}
        //                         raw_url={file.raw_url} contents_url={file.contents_url} patch={file.patch}
        //                     ></FileInfo>
        //                 </li>
        //             )
        //         })}
        //     </ul>
    )
}