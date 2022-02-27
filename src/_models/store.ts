import { IElev } from "./elever";
import { ILaereplan } from "./laereplaner";

export interface IDispatch {
  type: string;
  payload?: any;
}

export interface IState {
  valgtElev: string;
  alleElever: IElev[] | null;
  alleLaereplaner: ILaereplan[];
  valgteLaereplaner: ILaereplan[];
  valgteLPM: any[];
}