import mongoose from "mongoose";
import dotenv from "dotenv";
import { loadCsv } from "./src/utils/loadCsv.js";
import { normalizeMatch, getMatchesByYear } from "./src/utils/normalize.js";
import { loadData } from "./src/services/gameService.js";
import { createsCompetitionStatistics } from "./src/services/statisticsService.js";
import {
  calculatesTitlePrediction,
  savePredictionTable
} from "./src/services/predictionService.js";

dotenv.config();

async function main() {
    try {
        // Establish database connection
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected!");

        // Load raw match data from CSV file
        const matches = await loadCsv("./data/campeonato-brasileiro-full.csv");

        // Filter matches by year (2024) and normalize data
        const matches2024 = getMatchesByYear(matches, 2024);
        const normalizedMatches = matches2024.map(normalizeMatch);

        // Persist normalized match data into the database
        await loadData(normalizedMatches);

        // Generate championship statistics for the 2024 season
        const statistics2024 = await createsCompetitionStatistics(2024);

        // Calculate title prediction for the 2025 season
        const prediction2025 = await calculatesTitlePrediction(statistics2024);
        console.log(JSON.stringify(prediction2025, null, 2));

        // Save prediction results to the database
        await savePredictionTable(prediction2025, 2025);
        
        console.log("Prediction created successfully!"); 
    } catch (err) {
        console.log("Unexpected application error:", err);
        process.exit(1);
    }
}

main();