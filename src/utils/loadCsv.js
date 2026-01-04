import fs from "fs";
import csv from "csv-parser";

const HEADERS = [
  "id",
  "rodada",
  "data",
  "hora",
  "mandante",
  "visitante",
  "formacao_mandante",
  "formacao_visitante",
  "tecnico_mandante",
  "tecnico_visitante",
  "vencedor",
  "arena",
  "mandante_placar",
  "visitante_placar",
  "mandante_estado",
  "visitante_estado"
];

export function loadCsv(path) {
  return new Promise((resolve, reject) => {
    const rows = [];

    fs.createReadStream(path)
      .pipe(csv({
        separator: ",",
        headers: HEADERS,
        skipLines: 1,        
        quote: '"'
      }))
      .on("data", data => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", reject);
  });
}
