import axios from 'axios';
import React, {useState} from "react";

export default function RepoTreeAPIHandler(owner, repo) {

        const format = 'http://localhost:8080/api/tree?repo=' + repo + '&owner=' + owner;

        const [nodes, setNodes] = useState([]);
        axios.get(format)
            .then(response => {
                const data = response.data;
                const depthMap = new Map();
                for(let item of data) {
                    const depth = item['depth'];
                    if(!depthMap.has(depth))
                        depthMap.set(depth, 1);
                    else
                        depthMap.set(depth, depthMap.get(depth) + 1);
                }

                for(let item of data) {
                    const depth = item['depth'];
                    const breadth = item['breadth'];
                    const message = item['message'];
                    const sha = item['sha'];
                    const parentShas = item['parentShas'];
                    const maxBreadth = depthMap.get(depth);

                    const add = [sha, message, depth, breadth, maxBreadth, parentShas];

                    setNodes(prev => [...prev, add]);
                }
            })
            .catch(error =>{
                console.log(error);
            });

        return nodes;
}