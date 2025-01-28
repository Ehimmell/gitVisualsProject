import axios from 'axios';

export default async function RepoTreeAPIHandler(owner, repo) {
    const url = `http://localhost:8080/api/tree?repo=${repo}&owner=${owner}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        const depthMap = new Map();
        data.forEach(item => {
            const depth = item.depth;
            depthMap.set(depth, (depthMap.get(depth) || 0) + 1);
        });

        return data.map(item => {
            const { depth, breadth, message, sha, parentShas } = item;
            const maxBreadth = depthMap.get(depth);

            return [sha, message, depth, breadth, maxBreadth, parentShas];
        });
    } catch (error) {
        console.error(error);
        return [];
    }
}