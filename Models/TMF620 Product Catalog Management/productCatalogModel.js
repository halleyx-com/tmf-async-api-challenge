const mongoose = require("mongoose");
const productCatalogSchema = mongoose.Schema(
  {
    id: { type: String },
    displayID: { type: String },
    name: {
      type: String,
      unique: true,
    },
    // lastUpdate: { type: String, default: new Date().toISOString()},
    lastUpdate: { type: Date, default: new Date().toISOString() },

    lifecycleStatus: { type: String, default: "active" },
    validFor: { type: Object },
    category: { type: Array },
    relatedParty: { type: Array },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdate: "updatedAt" },
  }
);
module.exports = productCatalogSchema;
