import Papa from "papaparse"

export function parseCSV(text: string) {
  return Papa.parse(text, {
    header: true,
    skipEmptyLines: true,
  }).data
}