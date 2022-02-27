import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { IDispatch, IState } from '../_models/store';

const StoreContext = createContext({
  state: {} as IState,
  dispatch: ({ type }: IDispatch) => {},
});

const initialState = {
  valgtElev: '',
  alleElever: null,
  alleLaereplaner: [],
  valgteLaereplaner: [],
  valgteLPM: [],
};

const reducer = (state: IState, action: IDispatch) => {
  switch (action.type) {
    case 'setLaereplaner':
      return {
        ...state,
        alleLaereplaner: action.payload,
      };
    case 'loadElever':
      return {
        ...state,
        alleElever: action.payload,
      };
    case 'clearElever':
      return {
        ...state,
        alleElever: null,
      };
    case 'velgElev':
      return {
        ...state,
        valgtElev: action.payload,
      };
    case 'velgLaereplaner':
      return {
        ...state,
        valgteLaereplaner: action.payload,
      };
    case 'toggleSett':
      const planIndex = state.valgteLaereplaner.indexOf(action.payload);

      return {
        ...state,
        valgteLaereplaner: state.valgteLaereplaner.map(
          (plan: any, i: number) => {
            if (planIndex === i) {
              return { ...plan, planExpanded: !plan.planExpanded };
            } else {
              return plan;
            }
          }
        ),
      };
    case 'toggleLPM':
      return {
        ...state,
        valgteLaereplaner: state.valgteLaereplaner.map((plan: any) => {
          const setIndex = plan.lpmBlob.indexOf(action.payload);

          const blobs = plan.lpmBlob.map((blob: any, i: number) => {
            if (setIndex === i) {
              return { ...blob, settExpanded: !blob.settExpanded };
            } else {
              return blob;
            }
          });
          return { ...plan, lpmBlob: blobs };
        }),
      };
    case 'addLPM':
      return {
        ...state,
        valgteLPM: [...state.valgteLPM, action.payload],
      };
    case 'removeLPM':
      return {
        ...state,
        valgteLPM: state.valgteLPM.filter((lpm: any) => {
          return lpm !== action.payload;
        }),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
