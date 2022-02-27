import Papa from "papaparse";
let data:any = [];

export function parseCSV(csvFile: any) {
  Papa.parse(csvFile, {
    header: true,
    dynamicTyping: true,
    complete: (results: any) => {
      for (let i = 0; i < results.data.length; i++) {
        data.push(results.data[i]);
      }
    }
  });
  return data
};