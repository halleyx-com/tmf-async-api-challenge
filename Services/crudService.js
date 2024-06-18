const productSpecificationSchema = require("../Models/TMF620 Product Catalog Management/productSpecModel");
const mappedMproductSpecificationSchema = new Map([
  ["productSpecification", productSpecificationSchema],
]);



const { switchDB, getDBModel } = require("../switchDb");
const { createGenericID } = require("./genericIDService.js");
const { mongo } = require("mongoose");

const searchModel = async (module, search) => {
  let searched;
  switch (module) {
    case "productOffering": {
      searched = {
        $or: [
          { name: { $regex: new RegExp(search.search, "i") } },
          { offerType: { $regex: new RegExp(search.search, "i") } },
          { brand: { $regex: new RegExp(search.search, "i") } },
          { lifecycleStatus: { $regex: new RegExp(search.search, "i") } },
          { description: { $regex: new RegExp(search.search, "i") } }, // Add more fields as needed
          { lastUpdate: { $regex: new RegExp(search.search, "i") } },
        ],
      };
      break;
    }



    case "productSpecification": {
      searched = {
        $or: [
          { name: { $regex: new RegExp(search.search, "i") } },
          { specType: { $regex: new RegExp(search.search, "i") } },
          { brand: { $regex: new RegExp(search.search, "i") } },
          { lifecycleStatus: { $regex: new RegExp(search.search, "i") } },
          { description: { $regex: new RegExp(search.search, "i") } }, // Add more fields as needed
        ],
      };
      break;
    }
    case "productOrder": {
      searched = {
        $or: [
          { name: { $regex: new RegExp(search.search, "i") } },
          { "@type": { $regex: new RegExp(search.search, "i") } },
          { category: { $regex: new RegExp(search.search, "i") } },
          { statementOfIntent: { $regex: new RegExp(search.search, "i") } },
          { state: { $regex: new RegExp(search.search, "i") } },
          { description: { $regex: new RegExp(search.search, "i") } }, // Add more fields as needed
          { priority: { $regex: new RegExp(search.search, "i") } },
          { notificationContact: { $regex: new RegExp(search.search, "i") } },
        ],
      };
      break;
    }
    case "agreement": {
      searched = {
        $or: [
          { name: { $regex: new RegExp(search.search, "i") } },
          { type: { $regex: new RegExp(search.search, "i") } },
          { documentNumber: { $regex: new RegExp(search.search, "i") } },
          { statementOfIntent: { $regex: new RegExp(search.search, "i") } },
          { status: { $regex: new RegExp(search.search, "i") } },
          { description: { $regex: new RegExp(search.search, "i") } }, // Add more fields as needed
          { version: { $regex: new RegExp(search.search, "i") } },
        ],
      };
      break;
    }
    case "event": {
      searched = {
        $or: [
          { domain: { $regex: new RegExp(search.search, "i") } },
          { description: { $regex: new RegExp(search.search, "i") } }, // Add more fields as needed
          { "@type": { $regex: new RegExp(search.search, "i") } },
          { correlated: { $regex: new RegExp(search.search, "i") } },
          { priority: { $regex: new RegExp(search.search, "i") } },
          { status: { $regex: new RegExp(search.search, "i") } },
          { title: { $regex: new RegExp(search.search, "i") } },
        ],
      };
      break;
    }
    default:
      throw new Error(
        "Given filter or search module was not registered to do a operation."
      );
  }
  return searched;
};

const findModel = async (module, company) => {
  try {
    let queryModel,
      IDConfig = null;
    switch (module) {
      case "customer": {
        const customerModel = await switchDB(company, customerSchemas);

        const cusModel = await getDBModel(customerModel, "customer");
        IDConfig = {
          module: "product",
          subModule: "cm",
        };
        queryModel = cusModel;
        break;
      }
      case "tax": {
        const taxModel = await switchDB(company, mappedTaxSchema);

        const taxDefinition = await getDBModel(taxModel, "tax");
        IDConfig = {
          module: "product",
          subModule: "tax",
        };
        queryModel = taxDefinition;
        break;
      }
      case "discount": {
        const discountModel = await switchDB(company, mappedDiscountModel);

        const discountSchema = await getDBModel(discountModel, "discount");
        IDConfig = {
          module: "product",
          subModule: "discount",
        };
        queryModel = discountSchema;
        break;
      }
      case "address": {
        const addressModel = await switchDB(company, addressSchemas);

        const addModel = await getDBModel(addressModel, "address");
        IDConfig = {
          module: "product",
          subModule: "address",
        };
        queryModel = addModel;
        break;
      }
      case "productOffering": {
        const offering = await switchDB(company, mappedProductOfferingSchema);

        const offeringModel = await getDBModel(offering, "productOffering");
        IDConfig = {
          module: "product",
          subModule: "productoffering",
        };
        queryModel = offeringModel;
        break;
      }
      case "additionalCharges": {
        const charges = await switchDB(company, mappedAdditionalCharges);

        const chargesModel = await getDBModel(charges, "additionalCharges");
        IDConfig = {
          module: "product",
          subModule: "additionalCharges",
        };
        queryModel = chargesModel;
        break;
      }

      case "productstock": {
        const stockModel = await switchDB(company, stockSchema);

        const productStockModel = await getDBModel(stockModel, "productstock");
        IDConfig = {
          module: "product",
          subModule: "productstock",
        };
        queryModel = productStockModel;
        break;
      }

      // add case for product order
      case "productOrder": {
        const orderDB = await switchDB(company, orderSchema);

        const orderModel = await getDBModel(orderDB, "productOrder");
        IDConfig = {
          module: "product",
          subModule: "productorder",
        };
        queryModel = orderModel;
        break;
      }
      // add resource and service order
      case "serviceOrder": {
        const orderDB = await switchDB(company, mappedServiceOrder);

        const orderModel = await getDBModel(orderDB, "serviceOrder");
        IDConfig = {
          module: "product",
          subModule: "serviceorder",
        };
        queryModel = orderModel;
        break;
      }
      case "resourceOrder": {
        const orderDB = await switchDB(company, mappedResourceOrder);

        const orderModel = await getDBModel(orderDB, "resourceOrder");
        IDConfig = {
          module: "product",
          subModule: "resourceorder",
        };
        queryModel = orderModel;
        break;
      }
      case "quote": {
        const quoteModel = await switchDB(company, QuoteSchemas);

        const quotationModel = await getDBModel(quoteModel, "quote");
        IDConfig = {
          module: "product",
          subModule: "quote",
        };
        queryModel = quotationModel;
        break;
      }
      case "productinventory": {
        const inveModel = await switchDB(company, ProductInventorySchema);

        const inventoryModel = await getDBModel(inveModel, "productinventory");
        IDConfig = {
          module: "product",
          subModule: "productinventory",
        };
        queryModel = inventoryModel;
        break;
      }
      case "servicespecification": {
        const serviceSpec = await switchDB(
          company,
          mappedServiceSpecificationSchema
        );

        const serviceSpecModel = await getDBModel(
          serviceSpec,
          "serviceSpecification"
        );
        IDConfig = {
          module: "product",
          subModule: "servicespecification",
        };
        queryModel = serviceSpecModel;
        break;
      }
      case "resourcespecification": {
        const resourceSpec = await switchDB(
          company,
          mappedResourceSpecificationSchema
        );

        const resourceSpecModel = await getDBModel(
          resourceSpec,
          "resourceSpecification"
        );
        IDConfig = {
          module: "product",
          subModule: "resourcespecification",
        };
        queryModel = resourceSpecModel;
        break;
      }
      case "productSpecification": {
        const spec = await switchDB(company, mappedMproductSpecificationSchema);

        const specModel = await getDBModel(spec, "productSpecification");
        IDConfig = {
          module: "product",
          subModule: "productspecification",
        };
        queryModel = specModel;
        break;
      }
      case "partyInteraction": {
        const interactionDB = await switchDB(company, interactionSchema);

        const interactionModel = await getDBModel(
          interactionDB,
          "partyInteraction"
        );
        IDConfig = {
          module: "party",
          subModule: "partyinteraction",
        };
        // console.log("🚀 ~ findModel ~ IDConfig:", IDConfig);
        queryModel = interactionModel;
        break;
      }
      case "productOrder": {
        const orderDB = await switchDB(company, orderSchema);

        const orderModel = await getDBModel(orderDB, "productOrder");
        IDConfig = {
          module: "product",
          subModule: "productorder",
        };
        queryModel = orderModel;
        break;
      }
      case "agreement": {
        const agreementDB = await switchDB(company, AgreementSchema);
        const agreementModel = await getDBModel(agreementDB, "agreement");
        IDConfig = {
          module: "product",
          subModule: "aggreement",
        };
        queryModel = agreementModel;
        break;
      }
      case "category": {
        const categoryDB = await switchDB(company, categorySchema);
        const categoryModel = await getDBModel(categoryDB, "category");
        queryModel = categoryModel;
        IDConfig = {
          module: "product",
          subModule: "category",
        };
        break;
      }
      case "event": {
        const categoryDB = await switchDB(company, eventSchema);
        const categoryModel = await getDBModel(categoryDB, "event");
        IDConfig = {
          module: "util",
          subModule: "event",
        };
        queryModel = categoryModel;
        break;
      }
      default:
        throw new Error(
          "Given filter or search module was not registered to do a operation."
        );
    }
    return { schema: queryModel, IDConfig };
  } catch (error) {
    return error;
  }
};

const findParent = async (module, company) => {
  const organisationDB = await switchDB(company, OrganisationSchemas);
  const organisationModel = await getDBModel(organisationDB, "organisation");
  const parentOrg = await organisationModel.findOne({ tradingName: company });
  if (parentOrg.organizationParentRelationship.name != company) {
    let { schema } = await findModel(
      module,
      parentOrg.organizationParentRelationship.name
    );
    return schema;
  }
};

const findRootParent = async (module, company) => {
  const organisationDB = await switchDB(company, OrganisationSchemas);
  const organisationModel = await getDBModel(organisationDB, "organisation");
  const parentOrg = await organisationModel.findOne({ tradingName: company });
  console.log(parentOrg.organizationParentRelationship.name, company, "test");
  if (parentOrg.organizationParentRelationship.name != company) {
    const organisationDB = await switchDB(
      parentOrg.organizationParentRelationship.name,
      OrganisationSchemas
    );
    const organisationModel = await getDBModel(organisationDB, "organisation");
    const parentOrgs = await organisationModel.findOne({
      tradingName: parentOrg.organizationParentRelationship.name,
    });
    if (
      parentOrgs &&
      parentOrgs.organizationParentRelationship.name !=
      parentOrg.organizationParentRelationship.name
    ) {
      let { schema } = await findModel(
        module,
        parentOrgs.organizationParentRelationship.name
      );
      return schema;
    }
  }
};


const add = async (module, company, input, user) => {
  try {
    let { schema, IDConfig } = await findModel(module, company);
    const { ID, ok } = await createGenericID(company, IDConfig);
    if (ok == 1) {
      input.displayID = ID;
    }
    // create and map mongo object to id
    const id = new mongo.ObjectId();
    input.id = id;
    input._id = id;
    let addInputs = await schema.create(input);

    // let parentSchema = await findParent(module, company);
    // let rootParent = await findRootParent(module, company);
    // if (parentSchema != undefined) {
    //   await parentSchema.create(input);
    //   if (rootParent != undefined) {
    //     await rootParent.create(input);
    //   }
    // }
    let log = {
      category: module,
      ref: addInputs?._id,
      createdBy: user?.id,
      user: user?.name,
      action: "ADD",
      status: "active",
      detailedAction: [],
      message: `${
        addInputs?.name
          ? addInputs?.name
          : addInputs?.description
          ? addInputs?.description
          : addInputs?._id
      } ${module} was created successfully`,
    };
    // await initLog(company, log);
    return await addInputs;
  } catch (error) {
    console.log(error, "errorrr");
    // return error
    return { message: error };
  }
};

const getAll = async (module, company, query) => {
  try {
    let { schema } = await findModel(module, company);
    let list = await schema
      .find()
      .sort(query.sort)
      .skip(query.size)
      .limit(query.limit);
    return list;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const update = async (module, company, updateKey, user) => {
  try {
    let { schema } = await findModel(module, company);
    let isAvailable = await schema.findOne({
      _id: updateKey?.id,
    });
    if (isAvailable) {
      let updated = await schema.findOneAndUpdate(
        { _id: updateKey?.id },
        updateKey,
        {
          new: true,
          upsert: true,
        }
      );

      // let parentSchema = await findParent(module, company);
      // let rootParent = await findRootParent(module, company);
      // if (parentSchema != undefined) {
      //   await parentSchema.findOneAndUpdate({ name: updated.name }, update, {
      //     new: true,
      //     upsert: true,
      //   });
      //   if (rootParent != undefined) {
      //     await rootParent.findOneAndUpdate({ name: updated.name }, update, {
      //       new: true,
      //       upsert: true,
      //     });
      //   }
      // }

      const changes = await findDifferences(
        isAvailable?.toObject(),
        updated?.toObject()
      );
      // // console.log("🚀 ~ update ~ changes:", changes);
      let log = {
        category: module,
        ref: updated?._id,
        createdBy: user?.id,
        user: user?.name,
        action: "UPDATE",
        status: "active",
        detailedAction: changes,
        message: `${
          updated?.name
            ? updated?.name
            : updated?.description
            ? updated?.description
            : updated?._id
        } ${module} was updated successfully `,
      };
      // console.log("🚀 ~ update ~ log:", log);
    //  await initLog(company, log);
      // console.log("🚀 ~ update ~  a :", a);

      return await updated;
    }
    return { message: "No item found to update!" };
  } catch (error) {
    console.log(error, "eror thrown");
    return error;
  }
};
// Add with parent and root parent
const addWithParentAndRootParent = async (module, company, input, user) => {
  try {
    let { schema, IDConfig } = await findModel(module, company);
    const { ID, ok } = await createGenericID(company, IDConfig);
    if (ok == 1) {
      input.displayID = ID;
    }
    // create and map mongo object to id
    const id = new mongo.ObjectId();
    input.id = id;
    input._id = id;
    let baseURL = "https://tmf-upc-ghubgwxrcq-pd.a.run.app";
    switch (module) {
      case 'quote':
        baseURL += "/quotemanagement/"+id;
        break;
      case 'productOrder':
        baseURL += "/productOrder/"+id;
        break;
      case 'serviceOrder':
        baseURL += "/serviceOrder/"+id;
        break;
      case 'resourceOrder':
        baseURL += "/resourceOrder/"+id;
        break;
      default:
        break;
    }
    input.href = baseURL
    let createdItem = await schema.create(input);

    let parentSchema = await findParent(module, company);
    let rootParent = await findRootParent(module, company);
    if (parentSchema != undefined) {
      await parentSchema.create(input);
      if (rootParent != undefined) {
        await rootParent.create(input);
      }
    }
    let log = {
      category: module,
      ref: createdItem?._id,
      createdBy: user?.id,
      user: user?.name,
      action: "ADD",
      status: "active",
      detailedAction: [],
      message: `${
        createdItem?.name
          ? createdItem?.name
          : createdItem?.description
          ? createdItem?.description
          : createdItem?._id
      } ${module} was created successfully`,
    };
    // await initLog(company, log);
    return await createdItem;
  } catch (error) {
    console.log(error, "errorrr");
    // return error
    return { message: error };
  }
};
// Update with parent and root parent
const updateWithParentAndRootParentCompany = async (
  module,
  company,
  updateKey,
  user
) => {
  try {
    let { schema } = await findModel(module, company);
    let isAvailable = await schema.findOne({
      _id: updateKey?.id,
    });
    if (isAvailable) {
      let updated = await schema.findOneAndUpdate(
        { _id: updateKey?.id },
        updateKey,
        {
          new: true,
          upsert: true,
        }
      );
      const changes = await findDifferences(
        isAvailable?.toObject(),
        updated?.toObject()
      );

      let parentSchema = await findParent(module, company);
      // console.log("🚀 ~ parentSchema:", parentSchema)
      let rootParent = await findRootParent(module, company);
      // console.log("🚀 ~ rootParent:", rootParent)
      if (parentSchema != undefined) {
       let updatedd =  await parentSchema.findOneAndUpdate({ _id: updateKey?.id }, updateKey, {
          new: true,
          upsert: true,
        });
        // console.log("🚀 ~ updated:", updatedd)
        if (rootParent != undefined) {
          await rootParent.findOneAndUpdate({ _id: updateKey?.id }, updateKey, {
            new: true,
            upsert: true,
          });
        }
      }

      // // console.log("🚀 ~ update ~ changes:", changes);
      let log = {
        category: module,
        ref: updated?._id,
        createdBy: user?.id,
        user: user?.name,
        action: "UPDATE",
        status: "active",
        detailedAction: changes,
        message: `${
          updated?.name
            ? updated?.name
            : updated?.description
            ? updated?.description
            : updated?._id
        } ${module} was updated successfully `,
      };
      // console.log("🚀 ~ update ~ log:", log);
      // let a = await initLog(company, log);
      // console.log("🚀 ~ update ~  a :", a);

      return await updated;
    }
    return { message: "No item found to update!" };
  } catch (error) {
    console.log(error, "eror thrown");
    return error;
  }
};
// Delete with parent and root parent
const deleteOneWithParentAndRootParent = async (module, company, id, user) => {
  try {
    let { schema } = await findModel(module, company);
    let remove = await schema.findOneAndDelete({ _id: id });
    if (!remove) return { message: "No item found to delete!" };
    let log = {
      category: module,
      ref: id,
      createdBy: user?.id,
      user: user?.name,
      action: "DELETE",
      status: "active",
      detailedAction: [],
      message: `${
        remove?.name
          ? remove?.name
          : remove?.description
          ? remove?.description
          : remove?._id
      } was removed successfully from ${module}`,
    };
    let parentSchema = await findParent(module, company);
    let rootParent = await findRootParent(module, company);
    if (parentSchema != undefined) {
      await parentSchema.findOneAndDelete({ _id: id });
      if (rootParent != undefined) {
        await rootParent.findOneAndDelete({ _id: id });
      }
    }
    // await initLog(company, log);
    // console.log("🚀 ~ deleteOne ~ remove:", log);

    return "Deletion successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};



const deleteOne = async (module, company, id, user) => {
  try {
    let { schema } = await findModel(module, company);
    let remove = await schema.findOneAndDelete({ _id: id });
    if (!remove) return { message: "No item found to delete!" };
    let log = {
      category: module,
      ref: id,
      createdBy: user?.id,
      user: user?.name,
      action: "DELETE",
      status: "active",
      detailedAction: [],
      message: `${
        remove?.name
          ? remove?.name
          : remove?.description
          ? remove?.description
          : remove?._id
      } was removed successfully from ${module}`,
    };
    // await initLog(company, log);
    // console.log("🚀 ~ deleteOne ~ remove:", log);
    // let parentSchema = await findParent(module, company);
    // let rootParent = await findRootParent(module, company);
    // if (parentSchema != undefined) {
    //   await parentSchema.findOneAndDelete({ name: remove.name });
    //   if (rootParent != undefined) {
    //     await rootParent.findOneAndDelete({ name: remove.name });
    //   }
    // }

    return "Deletion successfully";
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getById = async (module, company, id) => {
  try {
    id = new mongo.ObjectId(id);
    // console.log("🚀 ~ getById ~ id:", id);
    let { schema } = await findModel(module, company);
    let retreive = await schema.findOne({ _id: id });
    return retreive;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getFields = async (module, company, query) => {
  try {
    let { schema } = await findModel(module, company);
    let show = {};
    show[query] = 1;
    console.log(show, "showw");
    let retreive = await schema.find({}, show);
    return retreive;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const getByname = async (module, company, id) => {
  try {
    let { schema } = await findModel(module, company);
    let retreive = await schema.findOne({ name: id });
    return retreive;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const search = async (module, company, search, query) => {
  try {
    // console.log("🚀 ~ search ~ searchFilter:",search);
    let { schema } = await findModel(module, company);
    let searchFilter = await searchModel(module, search);
    let sorted = await schema
      .find(searchFilter)
      .sort(query.sort)
      .skip(query.size)
      .limit(query.limit);
    return sorted;
  } catch (error) {
    console.log(error);
    return error;
  }
};
const inlineSearch = async (module, company, search, query) => {
  // console.log("🚀 ~ inlineSearch ~ search:", search);
  try {
    let { schema } = await findModel(module, company);
    let sorted = await schema
      .find(search)
      .sort(query.sort)
      .skip(query.size)
      .limit(query.limit);
    return sorted;
  } catch (error) {
    // console.log("🚀 ~ inlineSearch ~ error:", error);
    return error;
  }
};

const filter = async (module, company, search, query) => {
  try {
    let { schema } = await findModel(module, company);
    let sorted = await schema
      .find(search)
      .sort(query.sort)
      .skip(query.size)
      .limit(query.limit);
    return sorted;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const clone = async (module, company, data, user) => {
  try {
    let { schema } = await findModel(module, company);
    let collection = schema;

    const originalName = data.name;
    const findUniqueName = async (clonedName, copyCount) => {
      const existingDocument = await collection.findOne({ name: clonedName });

      if (existingDocument) {
        // If the document already exists, modify the name and try again
        return findUniqueName(
          `${originalName}_copy${copyCount + 1}`,
          copyCount + 1
        );
      } else {
        return clonedName;
      }
    };

    // Find the original document
    collection.findOne(
      { name: originalName },
      async (err, originalDocument) => {
        if (err) {
          console.error("Error finding document:", err);
          return;
        }

        // Generate the cloned name with suffix 'copy'
        const clonedName = await findUniqueName(`${originalName}_copy1`, 1);

        // Clone the document and set the new name
        const clonedDocument = await { ...data, name: clonedName };
        const { ID, ok } = await createGenericID(
          company,
          clonedDocument?.IDConfig
        );
        if (ok == 1) {
          clonedDocument.displayID = ID;
        }

        // let parentSchema = await findParent(module, company);
        // let rootParent = await findRootParent(module, company);
        // if (parentSchema != undefined) {
        //   await parentSchema.create(clonedDocument);
        //   if (rootParent != undefined) {
        //     await rootParent.create(clonedDocument);
        //   }
        // }
        const foundResult = await collection.create(
          clonedDocument,
          (err, result) => {
            if (err) {
              console.error("Error inserting cloned document:", err);
            } else {
              console.log("Document cloned successfully:", result);
              return result;
            }
          }
        );
        let log = {
          category: module,
          ref: foundResult?._id,
          createdBy: user?.id,
          user: user?.name,
          message: `${foundResult?.name} ${module} was cloned successfully`,
          status: "active",
          detailedAction: [],
          action: "CLONE",
        };
        // await initLog(company, log);
        // return await addInputs;
        return await foundResult;
      }
    );
  } catch (error) {
    return error;
  }
};

module.exports = {
  clone,
  add,
  addWithParentAndRootParent,
  updateWithParentAndRootParentCompany,
  deleteOneWithParentAndRootParent,
  getAll,
  update,
  deleteOne,
  getById,
  search,
  filter,
  getByname,
  inlineSearch,
  getFields,
  findModel,
  findParent,
  findRootParent,
};
