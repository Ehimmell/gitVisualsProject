import React from 'react';
import '../TextCarousel/TextCarousel.js';
import TextCarousel from "../TextCarousel/TextCarousel";
import './Home.css';
import techleaf from '../..//techleaf-edit.png';
import techdocs from '../..//techpaper-edit.png';

export default function Home({ handlePage }) {

  const handlePageChange = (newPage) => {
    if(handlePage) {
      handlePage(newPage);
    }
  };

    return (
        <div className={'container-1'}>
            <div className={'hook-container-1'}>
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
                    }}>Starting Guide &#8594;</button>
            </div>
            <div className={'feature-thumbnail-container'}>
                <div onClick={() => handlePageChange('search')}>
                    <img className={'search-thumbnail-container'} src = {techleaf} alt={'search-thumbnail'}/>
                    <p>Search a Tree</p>
                </div>
                <div onClick={() => handlePageChange('docs')}>
                    <img className={'docs-thumbnail-container'} src = {techdocs} alt={'docs-thumbnail'}/>
                    <p>View Documentation</p>
                </div>
            </div>
        </div>
    );
}