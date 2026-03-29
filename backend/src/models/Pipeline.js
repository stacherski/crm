const mongoose = require("mongoose");

const { Schema, model, Types } = mongoose;

const baseOptions = { timestamps: true };

const PipelineSchema = new Schema(
  {
    companyId: {
      type: Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    stage: {
      type: String,
      enum: [
        "prospecting",
        "qualification",
        "meeting",
        "pitch",
        "negotiation",
        "won",
        "lost",
      ],
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "won", "lost"],
      required: true,
      index: true,
    },
    progress: [
      {
        stage: { type: String, required: true },
        date: { type: Date, required: true },
        note: { type: String },
      },
    ],
    closingDate: { type: Date, required: true, index: true },
    followUpDate: { type: Date },
    notes: { type: String },
    brokerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  baseOptions,
);

const Pipeline = mongoose.model("Pipeline", PipelineSchema);

module.exports = Pipeline;
