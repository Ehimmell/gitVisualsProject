import React from 'react';
import './Dropdown.css';
export default function Dropdown(props) {
    return(
        <div>
            <h1 className = {'dropdown-text'}>{props.title}</h1>
        </div>
    )
}