import axios from 'axios';

export default async function CommitAPIHandler(owner, repo, sha) {
    const url = 'http://localhost:8080/api/commit?repo=${repo}&owner=${owner}&sha=${sha}';

    try {
        const response = await axios.get(url);


    }
}