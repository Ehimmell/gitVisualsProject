export default class Commit {
    constructor(sha, author, committer, url, message, stats, root) {
        this.sha = sha;
        this.author = author;
        this.committer = committer;
        this.url = url;
        this.message = message;
        this.stats = stats;
        this.root = root;
    }
}