import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrimaryButton, BackArrowDiv } from '../stylesheets/styledComponents';

const DataSheet = () => {
  const [showDataSheet, setShowDataSheet] = useState(true);

  const toggleDataSheet = () => {
    setShowDataSheet(!showDataSheet);
  };

  return (
    <div className="datasheet">
      <BackArrowDiv>
        <Link to="/" className="link">
          <h2>{showDataSheet ? '←' : '→'}</h2>
        </Link>
      </BackArrowDiv>
      <h1 style={{ marginTop: '30px', color: 'black' }}>Nutritional Data</h1>
      <div className="container">
        {showDataSheet ? (
          <>
            <div className="card datasheet-section" style={{ border: 'none' }}>
              {/* Render your datasheet component here */}
            </div>
            <div className="arrow-container">
              <button className="arrow-button" onClick={toggleDataSheet}>
                →
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="arrow-container">
              <button className="arrow-button" onClick={toggleDataSheet}>
                ←
              </button>
            </div>
            <div className="card mini-datasheet-section" style={{ border: 'none' }}>
              {/* Render your mini-datasheet component here */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DataSheet;
