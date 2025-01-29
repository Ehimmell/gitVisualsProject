import React, {useEffect, useState} from 'react';
import CommitAPIHandler from "./CommitAPIHandler";
import Loading from "../Loading/Loading";

export default function CommitInfoSheet(props) {
    const [loading, setLoading] = useState(true);
    const [commit, setCommit] = useState(null);
    const [files, setFiles] = useState([]);
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

    return(
        <div>
            <h1>Commit Info</h1>
            <h2>SHA:</h2>
            <p>{commit.sha}</p>
            <h2>Author:</h2>
            <p>{commit.author.name ? commit.author.name : <em>No name</em>} on {commit.author.date ? commit.author.date : <em>No date</em>}</p>
            <p>Email: {commit.author.email}</p>
            <h2>Committer:</h2>
            <p>{commit.committer.name} on {commit.committer.date}</p>
            <p>Email: {commit.committer.email}</p>
            <h2>Message:</h2>
            <p>{commit.message}</p>
            <h2>Change Stats:</h2>
            <p>+: {commit.stats.additions}</p>
            <p>-: {commit.stats.deletions}</p>
            <p>Total: {commit.stats.total}</p>
            <h2>Files:</h2>
            <ul>
                {files.map(file => {
                    return (
                        <li key={file.sha}>
                            <h3>{file.filename}</h3>
                            <p>Status: {file.status}</p>
                            <p>+: {file.additions}</p>
                            <p>-: {file.deletions}</p>
                            <p>Changes: {file.changes}</p>
                            <a href={file.blob_url}>Blob</a>
                            <a href={file.raw_url}>Raw</a>
                            <a href={file.contents_url}>Contents</a>
                            <p>{file.patch}</p>
                        </li>
                    )
                })}
            </ul>


        </div>
    )

}