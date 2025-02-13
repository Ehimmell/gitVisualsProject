import React, {useEffect, useState} from 'react';
import CommitAPIHandler from "./CommitAPIHandler";
import Loading from "../Loading/Loading";
import './CommitInfoSheet.css';
import FileInfo from "../File/FileInfo";
import FileDirectory from "../FileFolder/FileDirectory";


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
            <h1 style={{marginBottom:"20px"}} className={'title'}>{commit.message}</h1>
            <h3 className={'info'}>Author</h3>
            <p className={'person'}><strong>{commit.author.name}</strong> ({commit.author.email})
                on <strong>{authorDate}</strong> at <strong>{authorTime}</strong></p>
            <h3 className={'info'}>Committer</h3>
            <p style={{marginBottom:"20px"}} className={'stopping-person'}><strong>{commit.committer.name}</strong> ({commit.committer.email})
                on <strong>{committerDate}</strong> at <strong>{committerTime}</strong></p>
            <p className={'top-stat'} style={{color: 'green'}}>+: {commit.stats.additions}</p>
            <p className={'bottom-stat'} style={{marginBottom:"20px", color: 'red'}}>-: {commit.stats.deletions}</p>
            <h3>Files</h3>
            <FileDirectory directory={commit.root}></FileDirectory>


        </div>
    )

}