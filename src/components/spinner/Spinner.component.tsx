import React, { FC } from 'react';
import './spinner.styles.scss';

const Spinner: FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Laster ...</p>
    </div>
  );
};

export default Spinner;
