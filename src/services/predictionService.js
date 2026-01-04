import Previsao from "../models/Previsao.js";

export function calculatesTitlePrediction(stats) {
    
    // Calculates the force of each team
    const withForce = stats.map(team => ({
        ...team,
        forca: (3 * team.taxa_vitoria) + (1 * team.taxa_empate)
    }));

    // Calculates the total force of all teams
    const forcesSum = withForce.reduce((total, force) => total + force.forca, 
    0 
    );

    // Calculates title probability for each team
    const prediction = withForce.map(team => ({
        ...team,
        probabilidade_titulo: team.forca / forcesSum
    }));

    return prediction.sort((a, b) => b.probabilidade_titulo - a.probabilidade_titulo);
}

export async function savePredictionTable(prediction, predictionYear) {
    try {
        const predictionWithYear = prediction.map(p => ({ 
            ...p,
            ano_previsto: predictionYear
        }));
        await Previsao.deleteMany({ ano_previsto: predictionYear});
        await Previsao.insertMany(predictionWithYear);

    console.log("Prediction table saved!");
    } catch (err) {
        console.log("Error while saving prediction table.", err);
        throw err;
    }
}