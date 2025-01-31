export default class File {
    constructor(sha, filename, status, additions, deletions, changes, blob_url, raw_url, contents_url, patch) {
        this.sha = sha;
        this.filename = filename;
        this.status = status;
        this.additions = additions;
        this.deletions = deletions;
        this.changes = changes;
        this.blob_url = blob_url;
        this.raw_url = raw_url;
        this.contents_url = contents_url;
        this.patch = patch;
    }
}