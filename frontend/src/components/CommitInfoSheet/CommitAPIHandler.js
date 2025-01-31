import axios from 'axios';
import Commit from "./Commit";
import File from "../File/File";
import Author from "./Author";
import Stats from "./Stats";

export default async function CommitAPIHandler(owner, repo, sha) {
    const url = `http://localhost:8080/api/commit?repo=${repo}&owner=${owner}&sha=${sha}`;

    try {
        const response = await axios.get(url);

        const data = response.data;

        const files = data.files.map(file => {
            const { sha, filename, status, additions, deletions, changes, blob_url, raw_url, contents_url, patch } = file;
            return new File(sha, filename, status, additions, deletions, changes, blob_url, raw_url, contents_url, patch);
        });

        const author = new Author(data.commit.author.name, data.commit.author.email, data.commit.author.date);
        const committer = new Author(data.commit.committer.name, data.commit.committer.email, data.commit.committer.date);
        const stats = new Stats(data.stats.additions, data.stats.deletions, data.stats.total)

        return new Commit(data.sha, author, committer, data.commit.url, data.commit.message, stats, files);
    } catch {
        console.error('Failed to load data.');
        return null;
    }
}