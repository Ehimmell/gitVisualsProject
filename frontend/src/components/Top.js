import React from 'react';
import './Top.css';
import Dropdown from './Dropdown';

export default function Top() {
    return(
        <div>
            <div className= "top-tab">
                <h1><em>git-trees</em></h1>
                <Dropdown title="&#8964;"></Dropdown>
            </div>
        </div>
    )
}