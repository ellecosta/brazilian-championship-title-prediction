export function getMatchesByYear(matches, year) {
    return matches.filter(match => {
        if (!match.data) {
            return false;
        }

    const splitDate = match.data.split("/");
    const matchYear = splitDate[2];

    return matchYear === String(year)
    })
}

export function normalizeText(text) {
    if (!text) return null;
    return text.trim();
  
}

export function normalizeDate(dateStr) {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split("/");

  return new Date(year, month - 1, day); 
}

export function normalizeMatch(match) {
    // Normalize date
    const data = normalizeDate(match.data);
    
    // Extracts year
    const ano = data ? data.getFullYear() : null;

    return {
        ...match,

        partida_id: Number(match.id),
        rodada: Number(match.rodada),
        mandante_placar: Number(match.mandante_placar),
        visitante_placar: Number(match.visitante_placar),
        ano,
        mandante: normalizeText(match.mandante),
        visitante: normalizeText(match.visitante),
        arena: normalizeText(match.arena),
        vencedor: match.vencedor === "-" ? "Empate" : normalizeText(match.vencedor),
        data
    };
}