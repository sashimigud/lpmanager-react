import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StoreProvider } from './store/globalStore';

import Header from './components/header/Header.component';
import ImportStudents from './pages/importStudents/ImportStudents.component';
import Dashboard from './pages/dashboard/Dashboard.component';

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ImportStudents />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </StoreProvider>
    </div>
  );
}

export default App;
