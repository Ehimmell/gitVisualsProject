import React from 'react';
import './Loading.css';

/*
Loading animations taken from loading.io
 */
export default function Loading() {
    return (
        <div className="lds-facebook">
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}