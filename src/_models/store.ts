import { IElev } from "./elever";
import { IFormatedLpm, ILaereplan } from "./laereplaner";

export interface IDispatch {
  type: string;
  payload?: any;
}

export interface IState {
  valgtElev: IElev;
  alleElever: IElev[] | null;
  alleLaereplaner: ILaereplan[];
  valgteLaereplaner: IFormatedLpm[];
  valgteApiLaereplaner: ILaereplan[];
  valgteLPM: any[];
}