import mongoose from "mongoose";

const jogoSchema = new mongoose.Schema(
  {
    id: Number,
    rodada: Number,
    data: Date,
    ano: Number,

    mandante: String,
    visitante: String,
    arena: String,

    mandante_placar: Number,
    visitante_placar: Number,

    vencedor: String,
    perdedor: String
  },
  {
    collection: "jogos", 
    timestamps: true
  }
);

export default mongoose.model("Jogo", jogoSchema);
