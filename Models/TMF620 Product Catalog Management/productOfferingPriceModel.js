const mongoose = require("mongoose");

const offeringpriceModel = mongoose.Schema(
  {
    isBundle: { type: Boolean },
    href: {
      type: String,
      default:
        "https://tmf-upc-ghubgwxrcq-pd.a.run.app/catalogManagement/productOfferingPrice",
    },
    displayID: { type: String },
    id: { type: String },
    lifecycleStatus: { type: String },
    name: { type: String, required: true, unique: true },
    priceType: { type: String, required: true },
    bundledPopRelationship: { type: Array },
    description: { type: String },
    version: { type: Number },
    validFor: { type: Object },
    unitOfMeasure: { type: Object },
    recurringChargePeriodType: { type: String },
    recurringChargePeriodLength: { type: Number },
    offerType: { type: String },
    price: { type: Object },
    percentage: { type: Number },
    popRelationship: { type: Array },
    productSpecCharValueUse: { type: Array },
    productOfferingTerm: { type: Array },
    place: { type: Array },
    constraint: { type: Array },
    pricingLogicAlgorithm: { type: Object },
    tax: { type: Array },
    lastUpdate: { type: Date, default: new Date().toISOString() },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdate: "updatedAt" },
  }
);

module.exports = offeringpriceModel;
