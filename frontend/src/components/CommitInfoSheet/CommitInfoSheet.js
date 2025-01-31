import React, {useEffect, useState} from 'react';
import CommitAPIHandler from "./CommitAPIHandler";
import Loading from "../Loading/Loading";
import './CommitInfoSheet.css';
import FileInfo from "../File/FileInfo";


export default function CommitInfoSheet(props) {
    const [loading, setLoading] = useState(true);
    const [commit, setCommit] = useState(null);
    const [files, setFiles] = useState([]);
    const [x, setX] = useState(false);
    useEffect(() => {
        ;(async() => {
            try {
                setLoading(true);
                const data = await CommitAPIHandler(props.owner, props.repo, props.sha);

                setCommit(data);
                setFiles(data.files);

                setLoading(false);

            } catch {
                setLoading(false);
            }
        })();
    }, [props.owner, props.repo, props.sha]);

    if(loading) {
        return <Loading></Loading>
    }

    const onClick = () => {
        props.onSendData(false);
    }

    const authorDate = commit.author.date.substring(0,commit.author.date.indexOf('T'));
    const authorTime = commit.author.date.substring(commit.author.date.indexOf('T')+1, commit.author.date.indexOf('Z'));

    const committerDate = commit.committer.date.substring(0,commit.committer.date.indexOf('T'));
    const committerTime = commit.committer.date.substring(commit.committer.date.indexOf('T')+1, commit.committer.date.indexOf('Z'));

    return(
        <div className={"info-sheet-container"}>
            <button onClick={onClick}className={'x'}>&times;</button>
            <p className={'git'}><em><strong>git-commit</strong></em></p>
            <p className={'sha'}>{commit.sha}</p>
            <h1 className={'title'}>{commit.message}</h1>
            <p className={'divider'}>_____________</p>
            <h3 className={'info'}>Author</h3>
            <p className={'person'}><strong>{commit.author.name}</strong> ({commit.author.email})
                on <strong>{authorDate}</strong> at <strong>{authorTime}</strong></p>
            <h3 className={'info'}>Committer</h3>
            <p className={'stopping-person'}>{commit.committer.name} ({commit.committer.email})
                on {committerDate} at {committerTime}</p>
            <p className={'divider'}>_____________</p>
            <p className={'top-stat'} style={{color: 'green'}}>+: {commit.stats.additions}</p>
            <p className={'bottom-stat'} style={{color: 'red'}}>-: {commit.stats.deletions}</p>
            <p className={'divider'}>_____________</p>
            <h3>Files</h3>
            <ul>
                {files.map(file => {
                    return (
                        <li className={"files-list"} key={file.sha}>
                            <FileInfo
                                title={file.filename} status={file.status} additions={file.additions}
                                deletions={file.deletions} changes={file.changes} blob_url={file.blob_url}
                                raw_url={file.raw_url} contents_url={file.contents_url} patch={file.patch}
                            ></FileInfo>
                        </li>
                    )
                })}
            </ul>


        </div>
    )

}