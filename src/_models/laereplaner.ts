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