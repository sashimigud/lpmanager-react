import React, { FC } from 'react';
import './loading.styles.scss';

const LoadingScreen: FC = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Laster ...</p>
    </div>
  );
};

export default LoadingScreen;
