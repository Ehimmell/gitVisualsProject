import React, { useState, useEffect } from 'react';
import '../TextCarousel/TextCarousel.js';
import TextCarousel from "../TextCarousel/TextCarousel";
import './Home.css';

export default function Home({ handlePage }) {
    const [page, setPage] = useState('home');

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className={'container-1'}>
            <TextCarousel
                texts={[
                    'Visualize a repo',
                    'Summarize commits',
                    'Interact with version control'
                ]}
            />
                <button
                    className={'unstyled-clear-1-home'}
                    style={{
                        paddingTop: '0px',
                        paddingBottom: '0px',
                    }}>&#8594;</button>
        </div>
    );
}