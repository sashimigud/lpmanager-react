import React, { useState, useEffect, FC, ChangeEvent } from 'react';
import './importStudents.styles.scss';
import { useNavigate } from 'react-router-dom';

import { parseCSV } from '../../_utilities/papaParse';
import { useStore } from '../../store/globalStore';
import { fetchLaereplaner } from '../../_utilities/fetchLaereplaner';

const ImportStudents: FC = () => {
  const navigate = useNavigate();

  const { state, dispatch } = useStore();
  const [help, setHelp] = useState(false);

  const loadCSV = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const parsedCSV = parseCSV(event.target.files[0]);
    dispatch({ type: 'loadElever', payload: parsedCSV });
  };

  useEffect(() => {
    if (state.alleElever !== null) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.alleElever]);

  useEffect(() => {
    if (state.alleLaereplaner.length === 0) {
      fetchLaereplaner().then((lp) =>
        dispatch({ type: 'setLaereplaner', payload: lp })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO: info om formatering av CSVen - på help-tooltipen

  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          Velkommen til <span>LPM</span>anager
        </h1>
        <p>Kom i gang ved å importere et sett elever</p>
        <label className="import-btn">
          <input type="file" accept=".csv" onChange={loadCSV} />
          Importér klasse
        </label>
        <div
          className={
            'help-btn ' + (help ? 'help-btn-active' : 'help-btn-dormant')
          }
          onClick={() => setHelp(!help)}>
          <span>?</span>
        </div>
        <div>
          {help ? (
            <div className="help-message">
              <p>Importér elever fra en kommaseparert-fil (CSV-fil).</p>
              <p>CSV-fil utleveres av administrasjonen</p>
              <p>CSV-filen må være på følgende format: </p>
              <p>Navn, Fødselsdato, osv</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ImportStudents;
