const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = Schema;

const genericIDConfigSchema = new Schema(
  {
    module: { type: String, required: true },
    subModule: { type: String, required: true },
    prefix: { type: String, required: true },
    minDigit: { type: Number, default: 4 },
    delimeter: { type: String, default: "-" },
    lastUpdate: { type: Date, default: new Date().toISOString() },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

genericIDConfigSchema.index({ module: 1, prefix: 1 });

module.exports = genericIDConfigSchema;
