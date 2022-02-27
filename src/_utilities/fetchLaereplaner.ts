import { IApiLaereplan, IApiTittel, ILaereplan } from "../_models/laereplaner";

let allePlaner = "http://data.udir.no/kl06/laereplaner.json";

export const fetchLaereplaner = async () => {
    try {
      const result = await fetch(allePlaner, {
        headers: new Headers({
           'content-type': 'application/json', 
           Accept: "application/json" 
        })
      });

      const resBody = await result.json();

      const formattedLaereplan = resBody.map((laereplan: IApiLaereplan): ILaereplan => {
        let defaultTittel = laereplan.tittel.filter(
        (tittel: IApiTittel) => tittel.spraak === 'default'
        )[0];
        let lpUtgaatt;
        if(laereplan.status.includes('utgaatt')){
          lpUtgaatt = true
        } else {
          lpUtgaatt = false
        }
        return {
          fagkode: laereplan.kode,
          url: laereplan['url-data'],
          title: defaultTittel.verdi,
          lpExpired:lpUtgaatt
        };
      });
      return formattedLaereplan
    } catch (e) {
      // ERROR HANDLING
      console.log(e);
    }
};