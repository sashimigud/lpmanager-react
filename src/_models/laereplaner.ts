export interface ILaereplan {
  fagkode: string;
  lpExpired: boolean;
  title: string;
  url: string;
}

export interface IApiTittel {
  spraak: string;
  verdi: string;
}

export interface IApiLaereplan {
  'grep-type'?: string;
  'gyldig-fra'?: string | null;
  'gyldig-til'?: string | null;
  id: string;
  kode: string;
  'sist-endret'?: string | null;
  status: string;
  tittel: IApiTittel[];
  uri: string;
  'url-data': string;
}

export interface IApiKompetansemaal {
  kode: string;
  rekkefoelge: number;
  tittel: string;
  'url-data': string;
}

// kode: "K16814"
// rekkefoelge: 1
// tilhoerer-hovedomraade: {kode: 'HO1520', uri: 'http://psi.udir.no/kl06/HO1520', url-data: 'https://data.udir.no/kl06/HO1520'}
// tittel: " planlegge, vurdere og gjennomføre arbeid i ulike typer planteproduksjoner i tråd med gjeldende regelverk, standarder, kvalitetssystemer og krav til dokumentasjon"
// uri: "http://psi.udir.no/kl06/K16814"
// url-data: "htt

export interface IApiKompetansemaalSett {
  kompetansemaal: IApiKompetansemaal[];
  tittel: IApiTittel[];
}

export interface IApiKompetansemaalKap {
  kompetansemaalsett: IApiKompetansemaalSett[]
}

export interface IApiLaereplanData {
  tittel: IApiTittel[];
  'kompetansemaal-kapittel': IApiKompetansemaalKap
}

export interface ILpmSett {
  lpmSettTittel: string,
  rekkefoelge: number,
  tittel: string,
  checked: boolean
}

export interface ILpmBlob {
  settExpanded: boolean;
  lpmSettTittel: string;
  lpmSett: ILpmSett[];
}

export interface IFormatedLpm {
  planExpanded: boolean;
  planTittel: string;
  lpmBlob: ILpmBlob[];
}