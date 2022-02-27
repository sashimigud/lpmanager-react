import { IApiKompetansemaal, IApiKompetansemaalSett, IApiLaereplanData, IApiTittel, IFormatedLpm } from "../_models/laereplaner";

export const formatLP = (data: IApiLaereplanData): IFormatedLpm => {
  let planTittel = data.tittel.filter((tittel: IApiTittel) => tittel.spraak === "default")[0].verdi;

  const lpmBlob = data["kompetansemaal-kapittel"].kompetansemaalsett.map((sett: IApiKompetansemaalSett) => {
		let lpmSettTittel = sett.tittel.filter((tittel: IApiTittel) => tittel.spraak === "default")[0].verdi;
		
		let lpmSett = sett.kompetansemaal.map((lpm: IApiKompetansemaal) => {
			return {
				lpmSettTittel: lpmSettTittel,
				rekkefoelge: lpm.rekkefoelge,
				tittel: lpm.tittel,
				checked: false
			}
		});
		
		return {
			settExpanded: true,
			lpmSettTittel: lpmSettTittel,
			lpmSett: lpmSett
		}
	});

	return {
		planExpanded: true,
		planTittel: planTittel,
		lpmBlob: lpmBlob
	}
};