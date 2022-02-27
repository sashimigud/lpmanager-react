import React, { FC } from 'react';
import './header.styles.scss';

import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/globalStore';

const Header: FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useStore();

  const goHome = () => {
    dispatch({ type: 'clearElever' });
    navigate('/');
  };

  return (
    <div className="header-container">
      <p
        onClick={goHome}
        className="header-logo"
        title="Hjem - Importér ny klasse">
        <span>LPM</span>anager
      </p>
    </div>
  );
};

export default Header;
