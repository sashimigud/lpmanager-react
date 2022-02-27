import React, { FC } from 'react';

import { Route, Routes } from 'react-router-dom';
import YFFGodkjenn from './yff-godkjenn/YffGodkjenn.component';
import YFF from './yff-main/Yff.component';

const YffContainer: FC = () => {
  return (
    <Routes>
      <Route path="" element={<YFF />} />
      <Route path="godkjenn" element={<YFFGodkjenn />} />
    </Routes>
  );
};

export default YffContainer;
