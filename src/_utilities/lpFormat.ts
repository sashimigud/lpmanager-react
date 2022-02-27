export const formatLP = (data: any) => {
  let planTittel = data.tittel.filter((tittel: any) => tittel.spraak === "default")[0].verdi;

  const lpmBlob = data["kompetansemaal-kapittel"].kompetansemaalsett.map( (sett:any) => {
		let lpmSettTittel = sett.tittel.filter((tittel: any) => tittel.spraak === "default")[0].verdi;
		
		let lpmSett = sett.kompetansemaal.map((lpm: any) => {
			return {
				lpmSettTittel: lpmSettTittel,
				rekkefoelge: lpm.rekkefoelge,
				tittel: lpm.tittel,
				checked: false
			}
		});
		
		return {
			settExpanded:true,
			lpmSettTittel:lpmSettTittel,
			lpmSett: lpmSett
		}
	});

	return {
		planExpanded:true,
		planTittel:planTittel,
		lpmBlob:lpmBlob
	}
};