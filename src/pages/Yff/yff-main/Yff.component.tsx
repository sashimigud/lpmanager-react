import React, { useState, useEffect, ChangeEvent, FC } from 'react';
import './yff.styles.scss';

import { IElev } from '../../../_models/elever';

import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../../../components/spinner/Spinner.component';
import LpmList from '../../../components/lpm-list/LpmList.component';
import CustomButton from '../../../components/customButton/CustomButton.component';
import { useStore } from '../../../store/globalStore';
import { formatLP } from '../../../_utilities/lpFormat';
import { IFormatedLpm } from '../../../_models/laereplaner';

const YFF: FC = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useStore();

  const [valgtePlaner, setValgtePlaner] = useState<IFormatedLpm[] | []>([]);
  const [filtrerteElever, setFiltrerteElever] = useState<IElev[] | null>(null);
  const [klasser, setKlasser] = useState<string[]>([]);
  const [valgtElev, setValgtElev] = useState<IElev | string>('');

  // ------------------------------------------- lager klasser for select --> options

  useEffect(() => {
    if (state.alleElever) {
      //const klasser = [...new Set(state.alleElever.map((elev) => elev.Klasse))];
      const klasser = Array.from(
        new Set(state.alleElever.map((elev) => elev.Klasse))
      );
      setKlasser(klasser);
    }
  }, [state.alleElever]);

  // ------------------------------------------ FETCH læreplansett
  useEffect(() => {
    const fetchIndividuelleLP = async () => {
      if (state.valgteApiLaereplaner.length === 0) {
        return;
      } else {
        for await (const laereplan of state.valgteApiLaereplaner) {
          try {
            fetch(laereplan.url, {
              headers: new Headers({
                'content-type': 'application/json',
                Accept: 'application/json',
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                setValgtePlaner((prevState) => [...prevState, formatLP(data)]);
              });
          } catch (err) {
            console.log('feil: ', err);
          }
        }
      }
    };

    fetchIndividuelleLP();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------------------------------- OnMethods

  const filterOnKlasse = (event: ChangeEvent<HTMLSelectElement>) => {
    if (!state.alleElever) return;
    const filtrerte = state.alleElever.filter(
      (elev) => elev.Klasse === event.target.value
    );
    setFiltrerteElever(filtrerte);
    setValgtElev(filtrerte[0]);
  };

  const onValgtElev = (event: ChangeEvent<HTMLSelectElement>) => {
    setValgtElev(JSON.parse(event.target.value));
    dispatch({ type: 'velgElev', payload: JSON.parse(event.target.value) });
  };

  const onNext = () => {
    navigate('godkjenn');
  };

  useEffect(() => {
    if (valgtePlaner.length > 0) {
      dispatch({ type: 'velgLaereplaner', payload: valgtePlaner });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valgtePlaner]);

  // ------------------------ RENDER

  return (
    <div className="yff-container">
      {!valgtePlaner.length ? (
        <LoadingScreen />
      ) : (
        <div className="yff-content">
          <h1>Yrkesfaglig Fordypning</h1>
          <div>
            <p>Velg klasse:</p>
            <select
              className="yff-select"
              defaultValue=""
              onChange={(event) => filterOnKlasse(event)}>
              <option disabled value="">
                Velg Klasse
              </option>
              {klasser.length !== 0 ? (
                <>
                  {klasser.map((klasse: string) => (
                    <option
                      className="select-option"
                      value={klasse}
                      key={klasse}>
                      {klasse}
                    </option>
                  ))}
                </>
              ) : null}
            </select>
          </div>
          {filtrerteElever ? (
            <div>
              <p>Velg elev:</p>
              <select
                className="yff-select"
                defaultValue=""
                onChange={(event) => onValgtElev(event)}>
                <option disabled value="">
                  Velg elev
                </option>
                {filtrerteElever ? (
                  <>
                    {filtrerteElever.map((elev: IElev) => (
                      <option
                        className="select-option"
                        data-elev={elev}
                        key={elev.Fornavn + elev.Etternavn + elev.Klasse}
                        value={JSON.stringify(elev)}>
                        {elev.Etternavn} {elev.Fornavn}
                      </option>
                    ))}
                  </>
                ) : null}
              </select>
            </div>
          ) : null}
          {valgtElev ? (
            <div>
              <h2 className="lpmlist-heading">Velg Læreplanmål:</h2>
              <LpmList />
              <CustomButton
                text="Neste"
                isDisabled={state.valgteLPM.length !== 0 ? false : true}
                onClick={() => onNext()}
              />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default YFF;
