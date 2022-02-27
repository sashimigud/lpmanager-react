import React, { useState, FC, useEffect } from 'react';
import './dashboard.styles.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import { useStore } from '../../store/globalStore';
import CustomButton from '../../components/customButton/CustomButton.component';
import { ILaereplan } from '../../_models/laereplaner';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { fetchLaereplaner } from '../../_utilities/fetchLaereplaner';

const Dashboard: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();
  const faIcon = faSync as IconProp;

  const [searchResults, setSearchResults] = useState<ILaereplan[]>(
    state.alleLaereplaner
  );
  const [selectedResults, setSelectedResults] = useState<ILaereplan[] | []>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showExpired, setShowExpired] = useState<boolean>(false);

  const search = (searchTerm: string) => {
    const titleResults = state.alleLaereplaner.filter(
      (o) =>
        o.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.fagkode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(titleResults);
  };

  const onSelectLP = (laereplan: ILaereplan) => {
    const filteredResults = searchResults.filter(
      (lp) => lp.fagkode !== laereplan.fagkode
    );
    setSearchResults(filteredResults);

    if (
      selectedResults &&
      selectedResults.find((lp) => lp.fagkode === laereplan.fagkode) !==
        undefined
    ) {
      return;
    } else {
      setSelectedResults([...selectedResults, laereplan]);
    }
  };

  const removeSelectedLP = (laereplan: ILaereplan) => {
    const afterRemoved = selectedResults.filter(
      (lp) => lp.fagkode !== laereplan.fagkode
    );
    setSelectedResults(afterRemoved);

    if (
      searchResults.find((lp) => lp.fagkode === laereplan.fagkode) !== undefined
    ) {
      return;
    } else {
      setSearchResults([...searchResults, laereplan]);
    }
  };

  const onChosenModule = (module: string) => {
    dispatch({ type: 'velgApiLaereplaner', payload: selectedResults });

    if (module === 'YFF') {
      navigate('/YFF');
    } else if (module === 'Eksamen') {
      console.log('gå til eksamen');
    }
  };

  const refetchLaereplaner = () => {
    fetchLaereplaner().then((lp) =>
      dispatch({ type: 'setLaereplaner', payload: lp })
    );
  };

  useEffect(() => {
    if (state.alleLaereplaner.length > 0) {
      setSearchResults(state.alleLaereplaner);
    }
  }, [state.alleLaereplaner]);

  return (
    <div className="dashboard-container">
      <div className="dashboard-search-container">
        <div className="dashboard-searchbar-container">
          <div
            className="refresh-icon"
            title="Last ned UDIR-læreplaner på ny"
            onClick={() => refetchLaereplaner()}>
            <FontAwesomeIcon icon={faIcon} />
            <p>Last ned på nytt</p>
          </div>
          <input
            type="text"
            placeholder="Søk etter læreplaner, eks: elektrofag"
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                search(searchTerm);
              } else {
                return;
              }
            }}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <button onClick={() => search(searchTerm)}>Søk</button>
        </div>
        <div className="dashboard-results-container">
          <div className="dashboard-searchResults-container">
            {searchResults ? (
              <div>
                <div className="dashboard-searchResults-heading">
                  {' '}
                  LEGG TIL LÆREPLANER
                  <br />
                  <span>Trykk på en Læreplan for å legge den til </span>
                  <div className="toggleExpired-container">
                    <label>
                      <input
                        type="checkbox"
                        onClick={() => setShowExpired(!showExpired)}
                      />
                      Vis utgåtte læreplaner
                    </label>
                  </div>
                </div>
                {searchResults.map((result) => (
                  <div key={result.fagkode}>
                    {!showExpired && result.lpExpired ? null : (
                      <div
                        className="dashboard-searchResults-item"
                        onClick={() => onSelectLP(result)}>
                        <div className="dashboard-searchResults-kode">
                          {result.fagkode}
                        </div>
                        <div className="dashboard-searchResults-tittel">
                          {result.title}
                        </div>
                        <div className="dashboard-searchResults-status">
                          Status:
                          {result.lpExpired ? (
                            <span className="status-expired"> Utgått</span>
                          ) : (
                            <span className="status-active"> Aktiv</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="dashboard-searchResult-placeholder">
                Søk etter Læreplaner
              </div>
            )}
          </div>
          <div className="dashboard-selected-container">
            <div className="dashboard-selected-heading">
              VALGTE LÆREPLANER
              <br />
              <span>Trykk på en Læreplan for å fjerne den</span>
            </div>
            <div>
              {selectedResults ? (
                <div>
                  {selectedResults.map((lp) => (
                    <div
                      key={lp.fagkode}
                      className="dashboard-selected-content"
                      onClick={() => removeSelectedLP(lp)}>
                      <p className="selected-fagkode">{lp.fagkode}</p>
                      <p title={lp.title}>
                        {lp.title.length < 50
                          ? lp.title
                          : lp.title.substring(0, 50) + ' ...'}
                      </p>
                      <p>
                        Status:
                        {lp.lpExpired ? (
                          <span className="selected-utgaatt">Utgått</span>
                        ) : (
                          <span className="selected-aktiv">Aktiv</span>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div>Ingen læreplaner valgt</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-bottom-content">
        <p>Klikk på EKSAMEN om du skal forberede en eksamen, eller</p>
        <p>klikk på YFF om du skal forberede til Yrkesfaglig Fordypning</p>

        <div
          className="dashboard-btn-group"
          title={
            selectedResults.length === 0
              ? 'Velg en eller flere læreplaner for å fortsette'
              : ''
          }>
          <CustomButton
            setWidth={true}
            text="EKSAMEN"
            isDisabled={selectedResults.length !== 0 ? false : true}
            onClick={() => onChosenModule('Eksamen')}
          />
          <CustomButton
            setWidth={true}
            text="YFF"
            isDisabled={selectedResults.length !== 0 ? false : true}
            onClick={() => onChosenModule('YFF')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
