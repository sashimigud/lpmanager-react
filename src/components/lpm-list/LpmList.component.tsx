import React from 'react';
import './lpmList.styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../spinner/Spinner.component';
import { useStore } from '../../store/globalStore';
import { IFormatedLpm, ILpmBlob, ILpmSett } from '../../_models/laereplaner';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const LpmList = () => {
  const { state, dispatch } = useStore();

  const onSelectPlan = (plan: IFormatedLpm): void => {
    dispatch({ type: 'toggleSett', payload: plan });
  };

  const onSelectSet = (set: ILpmBlob): void => {
    dispatch({ type: 'toggleLPM', payload: set });
  };

  const onSelectLPM = (lpm: ILpmSett): void => {
    if (!state.valgteLPM.includes(lpm)) {
      dispatch({ type: 'addLPM', payload: lpm });
      lpm.checked = true;
    }

    if (state.valgteLPM.includes(lpm)) {
      dispatch({ type: 'removeLPM', payload: lpm });
      lpm.checked = false;
    }
  };

  return (
    <div className="lpmlist-container">
      {state.valgteLaereplaner ? (
        <div>
          {state.valgteLaereplaner.map((lp) => (
            <ChosenPlan
              key={lp.planTittel}
              plan={lp}
              onSelectPlan={onSelectPlan}
              onSelectSet={onSelectSet}
              onSelectLPM={onSelectLPM}
            />
          ))}
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

const ChosenPlan = ({
  plan,
  onSelectPlan,
  onSelectSet,
  onSelectLPM,
}: {
  plan: IFormatedLpm;
  onSelectPlan: (plan: IFormatedLpm) => void;
  onSelectSet: (set: ILpmBlob) => void;
  onSelectLPM: (lpm: ILpmSett) => void;
}) => (
  <div className="chosenPlan-container">
    <div className="plan-tittel" onClick={() => onSelectPlan(plan)}>
      <span>Plantittel</span> <span>{plan.planTittel}</span>
    </div>
    {plan.planExpanded ? (
      <div>
        {plan.lpmBlob.map((set) => (
          <ChosenSet
            key={set.lpmSettTittel}
            set={set}
            onSelectSet={onSelectSet}
            onSelectLPM={onSelectLPM}
          />
        ))}
      </div>
    ) : null}
  </div>
);

const ChosenSet = ({
  set,
  ...props
}: {
  set: ILpmBlob;
  onSelectSet: (set: ILpmBlob) => void;
  onSelectLPM: (lpm: ILpmSett) => void;
}) => {
  const faIconUp = faAngleUp as IconProp;
  const faIconDown = faAngleDown as IconProp;

  return (
    <div>
      <div className="sett-tittel" onClick={() => props.onSelectSet(set)}>
        <div>
          <span>{set.lpmSettTittel}</span>
          {set.settExpanded ? (
            <FontAwesomeIcon icon={faIconUp} />
          ) : (
            <FontAwesomeIcon icon={faIconDown} />
          )}
        </div>
      </div>
      {set.settExpanded ? (
        <div className="set-container">
          {set.lpmSett.map((lpm: ILpmSett) => (
            <div
              style={{ backgroundColor: lpm.checked ? 'green' : undefined }}
              key={lpm.tittel}
              className="lpm"
              onClick={() => props.onSelectLPM(lpm)}>
              <div>
                <input
                  type="checkbox"
                  checked={lpm.checked}
                  onChange={(e) => {}}
                />
              </div>
              <span>{lpm.tittel}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default LpmList;
