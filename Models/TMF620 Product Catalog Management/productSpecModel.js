const mongoose = require("mongoose");

const productSpecModel = mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true, unique: true },
    href: {
      type: String,
      default:
        "https://tmf-upc-ghubgwxrcq-pd.a.run.app/catalogManagement/productSpecification",
    },
    displayID: { type: String },
    bundledProductSpecification: { type: Array, default: [] },
    description: { type: String },
    brand: { type: String },
    isBundle: { type: Boolean, default: false },
    specType: { type: String },
    // lastUpdate: { type: String,default:new Date().toISOString() },
    lastUpdate: { type: Date, default: new Date().toISOString() },
    manufacturer: { type: String },
    lifecycleStatus: { type: String, default: "Active" },
    validFor: { type: Object },
    unitOfMeasure: { type: Object },
    category: { type: Array },
    version: { type: String },
    relatedParty: { type: Array },
    productSpecCharacteristic: { type: Array },
    serviceSpecification: { type: Array },
    productSpecificationRelationship: { type: Array },
    resourceSpecification: { type: Array },
    attachment: { type: Array },
    serviceResourceMapping: { type: Object },
    '@type':{type:String,default:"ProductSpecification"},
    topicRef:{type:Array},
    constraint: {
      type: Array,
      default: [],
    },
    notes: {
      type: Array,
    },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdate: "updatedAt" },
  }
);
module.exports = productSpecModel;
