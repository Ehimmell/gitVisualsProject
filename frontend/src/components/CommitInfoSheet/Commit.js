export default class Commit {
    constructor(sha, message, author, date, totalChanges, additions, deletions, files) {
        this.sha = sha;
        this.message = message;
        this.author = author;
        this.date = date;
        this.totalChanges = totalChanges;
        this.additions = additions;
        this.deletions = deletions;
        this.files = files;
    }
}