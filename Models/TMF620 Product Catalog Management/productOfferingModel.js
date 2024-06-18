const mongoose = require("mongoose");

const productOfferModel = mongoose.Schema(
  {
    href: {
      type: String,
      default:
        "https://tmf-upc-ghubgwxrcq-pd.a.run.app/catalogManagement/productOffering",
    },
    displayID: { type: String },
    relatedProduct: { type: Array },
    relatedParty: { type: Array },
    notes: { type: Array },
    id: { type: String },
    // lastUpdate: { type: String, default: new Date().toISOString()},
    lastUpdate: { type: Date, default: Date.now },
    lifecycleStatus: { type: String, default: "In study" },
    name: { type: String, required: true, unique: true },
    isBundle: { type: Boolean, default: false },
    productSpecification: { type: Object },
    constraint: { type: Array },
    bundledProductOffering: { type: Array },
    description: { type: String },
    price: { type: Object },
    percentage: { type: Object },
    priceType: { type: String },
    recurringChargePeriodType: { type: String },
    offerType: { type: String, default: "Atomic" },
    isSellable: { type: Boolean, default: true },
    validFor: { type: Object },
    version: { type: String },
    place: { type: Array },
    serviceLevelAgreement: { type: Object },
    channel: { type: Array },
    serviceCandidate: { type: Object },
    attachment: { type: Array },
    category: { type: Array },
    resourceCandidate: { type: Object },
    characteristicValueSpec: { type: Array },
    productOfferingTerm: { type: Array },
    marketSegment: { type: Array },
    productOfferingPrice: { type: Array },
    agreement: { type: Array },
    prodSpecCharValueUse: { type: Array },
    prodSpecCharValue: { type: Array },
    additionalCharges:{type:Array},
    tags:{type:Array},
    constraint: {
      type: Array,
      default: [],
    },
    unitOfMeasure:{type:String},
    "@type": { type: String, default: "ProductOffering" },
  },
  {
    timestamps: { createdAt: "createdAt", lastUpdate: "updatedAt" },
  }
);
module.exports = productOfferModel;
