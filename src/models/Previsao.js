import mongoose from "mongoose";

const previsaoSchema = new mongoose.Schema(
  {

    ano_previsto: {
      type: Number,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    jogos: Number,
    vitorias: Number,
    empates: Number,
    derrotas: Number,

    taxa_vitoria: Number,
    taxa_empate: Number,
    taxa_derrota: Number,

    forca: Number,

    probabilidade_titulo: Number
  },
  {
    collection: "previsoes",
    timestamps: true
  }
);

export default mongoose.model("Previsao", previsaoSchema);
