const mongoose = require("mongoose");
const productCategoryModel = new mongoose.Schema(
  {
    id: { type: String },
    displayID: { type: String },
    lastUpdate: { type: Date, default: new Date().toISOString() },
    type: { type: String, default: "tangible" },
    version: { type: String },
    lifecycleStatus: { type: String },
    validFor: { type: Object },
    parentId: { type: String },

    isRoot: { type: Boolean },
    name: { type: String, required: true, unique: true },
    description: { type: String },
    subCategory: { type: Array },
    productOffering: { type: Array },
    pricingType: { type: Array },
    identifier: { type: String },
    isSellabe: { type: Boolean },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdate: "updatedAt" },
  }
);
module.exports = productCategoryModel;
