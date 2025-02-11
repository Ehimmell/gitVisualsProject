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

        const root = data.root;

        console.log(data.root.children);

        const commit = data.commit;

        const author = new Author(commit.author.name, commit.author.email, commit.author.date);
        console.log('author: ' + JSON.stringify(author));
        const committer = new Author(commit.committer.name, commit.committer.email, commit.committer.date);
        const stats = new Stats(data.stats.additions, data.stats.deletions, data.stats.total)

        return new Commit(data.sha, author, committer, commit.url, commit.message, stats, root);
    } catch(error) {
        console.error('Failed to load data.' + error);
        return null;
    }
}