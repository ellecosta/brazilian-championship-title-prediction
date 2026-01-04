import Jogo from "../models/Jogo.js";

export async function loadData(normalizedData) {
    try {
        await Jogo.deleteMany({});
        await Jogo.insertMany(normalizedData);
        console.log("Match data loaded successfully");
  } catch (error) {
        console.error("Failed to load data into MongoDB:", error);
        throw error; 
  }
}
