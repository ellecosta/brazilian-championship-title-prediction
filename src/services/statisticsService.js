import Jogo from "../models/Jogo.js";

// Calculates championship statistics by year
export async function createsCompetitionStatistics(year) {
  try {
    return await Jogo.aggregate([
      { $match: { ano: year } },
      {
        $project: {
          times: [
            {
              nome: "$mandante",
              resultado: {
                $cond: [
                  { $eq: ["$vencedor", "Empate"] },
                  "empate",
                  {
                    $cond: [
                      { $eq: ["$vencedor", "$mandante"] },
                      "vitoria",
                      "derrota"
                    ]
                  }
                ]
              }
            },
            {
              nome: "$visitante",
              resultado: {
                $cond: [
                  { $eq: ["$vencedor", "Empate"] },
                  "empate",
                  {
                    $cond: [
                      { $eq: ["$vencedor", "$visitante"] },
                      "vitoria",
                      "derrota"
                    ]
                  }
                ]
              }
            }
          ]
        }
      },

      { $unwind: "$times" },

      {
        $group: {
          _id: "$times.nome",
          jogos: { $sum: 1 },
          vitorias: {
            $sum: { $cond: [{ $eq: ["$times.resultado", "vitoria"] }, 1, 0] }
          },
          empates: {
            $sum: { $cond: [{ $eq: ["$times.resultado", "empate"] }, 1, 0] }
          },
          derrotas: {
            $sum: { $cond: [{ $eq: ["$times.resultado", "derrota"] }, 1, 0] }
          }
        }
      },

      {
        $addFields: {
          taxa_vitoria: { $divide: ["$vitorias", "$jogos"] },
          taxa_empate: { $divide: ["$empates", "$jogos"] },
          taxa_derrota: { $divide: ["$derrotas", "$jogos"] }
        }
      },

      {
        $project: {
          _id: 0,
          time: "$_id",
          jogos: 1,
          vitorias: 1,
          empates: 1,
          derrotas: 1,
          taxa_vitoria: 1,
          taxa_empate: 1,
          taxa_derrota: 1
        }
      }
    ]);
    }
    catch (error) {
      console.error("Error while calculating championship statistics");
      throw error;
    }
}