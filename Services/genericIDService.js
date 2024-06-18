const { switchDB, getDBModel } = require("../switchDb");
const genericIDSchema = require("../Models/genericIdModel.js");
const mappedGenericIDSchema = new Map([["genericID", genericIDSchema]]);
const genericIDConfigSchema = require("../Models/genericIdConfigModel.js");
const mappedGenericIDConfigSchema = new Map([
  ["genericIDConfig", genericIDConfigSchema],
]);
const { mongo } = require("mongoose");

const createGenericID = async (company, moduleConfig) => {
  try {
    if (
      !moduleConfig ||
      (moduleConfig &&
        !Object.prototype.hasOwnProperty.call(moduleConfig, "module") &&
        !Object.prototype.hasOwnProperty.call(moduleConfig, "subModule"))
    ) {
      throw new Error("module or sub module field is missing");
    }
    const { module, subModule } = moduleConfig;
    // // console.log(
    // //   "🚀 ~ createGenericID ~ module, subModule, prefix:",
    // //   module,
    // //   subModule
    // // );
    let IDConfig = null;
    let retrievedIDConfig = await GET_REDIS_JSON(
      company + ".IDModules",
      `$[?(@.module=='${module}'&&@.subModule=='${subModule}')]`
    );
    if (retrievedIDConfig.data && retrievedIDConfig.ok == 1) {
      IDConfig = retrievedIDConfig.data[0];
    }
    let testperformanceAnalayzeStarted = process.hrtime();
    // console.log("🚀 ~ createGenericID ~ retrievedIDConfig:", retrievedIDConfig);
    if (
      (retrievedIDConfig.data && retrievedIDConfig.ok == 0) ||
      (retrievedIDConfig.data &&
        retrievedIDConfig.ok == 1 &&
        retrievedIDConfig.data.length == 0)
    ) {
      const customGenericIDConfigSchema = await switchDB(
        "Halleyx",
        mappedGenericIDConfigSchema
      );
      const genericIDConfigModel = await getDBModel(
        customGenericIDConfigSchema,
        "genericIDConfig"
      );
      IDConfig = await genericIDConfigModel.findOne({ module, subModule });
      // console.log("🚀 ~ createGenericID ~ IDConfig:", IDConfig)
      // if (!IDConfig) throw new Error("No ID config found");
      // if (!IDConfig) {
      //   const {
      //     ok,
      //     data = null,
      //     message = null,
      //   } = await createGenericIDModuleConfig(company, {
      //     ...moduleConfig,
      //     minDigit: 4,
      //   });
      //   if (ok == 1) {
      //     IDConfig = data;
      //   } else {
      //     throw new Error(message || 'No ID config found');
      //   }
      // }
      // return IDConfig
    }

    const customGenericIDSchema = await switchDB(
      company,
      mappedGenericIDSchema
    );
    const genericIDModel = await getDBModel(customGenericIDSchema, "genericID");

    const { minDigit, delimeter = "", _id, prefix } = IDConfig;
    // console.log("🚀 ~ createGenericID ~ IDConfig:", IDConfig);
    if (!module || !subModule || !minDigit) {
      throw new Error(
        "module or sub module or prefix or minDigit field is not declared"
      );
    }
    let previousID = await genericIDModel
      .findOne({ moduleConfigID: mongo.ObjectId(_id) })
      .sort({ createdAt: -1 });
    let initialNumber = "1";
    if (previousID) {
      initialNumber = new String(previousID.serialNumber + 1);
    }
    const paddedNumber = initialNumber.padStart(minDigit, 0);
    // console.log("🚀 ~ createGenericID ~ initialNumber:", initialNumber);
    let ID = prefix.concat(delimeter, paddedNumber);
    const generatedID = await genericIDModel.create({
      moduleConfigID: _id,
      serialNumber: initialNumber,
      ID,
    });
    // console.log("🚀 ~ createGenericID ~ generatedID:", generatedID);
    // let testperformanceAnalayzeFinished = process.hrtime(
    //   testperformanceAnalayzeStarted
    // );
    // let testexecutedDuration =
    //   testperformanceAnalayzeFinished[0] * 1e3 +
    //   Math.round(testperformanceAnalayzeFinished[1] / 1e6);
    if (!generatedID.ID) {
      throw new Error("There is some internal issue to create ID");
    }
    return {
      ok: 1,
      ID: generatedID.ID,
      // redisDuration: retrievedIDConfig.duration,
      // otherDuration: testexecutedDuration,
    };
    // return IDConfig
  } catch (error) {
    // console.log("🚀 ~ createGenericID ~ error:", error);
    return { ok: 0, message: error.message };
  }
};
const deleteGenericID = async (company, moduleConfig) => {
  try {
    if (
      !moduleConfig ||
      (moduleConfig &&
        !Object.prototype.hasOwnProperty.call(moduleConfig, "module") &&
        !Object.prototype.hasOwnProperty.call(moduleConfig, "prefix"))
    ) {
      throw new Error("module or prefix field is missing");
    }
    const { module, prefix, ID } = moduleConfig;
    let IDConfig = null;
    let retrievedIDConfig = await GET_REDIS_JSON(
      company + ".IDModules",
      `$[?(@.module=='${module}'&&@.prefix=='${prefix}')]`
    );
    if (retrievedIDConfig.data && retrievedIDConfig.ok == 1) {
      if (retrievedIDConfig.data.length == 0) {
        const customGenericIDConfigSchema = await switchDB(
          company,
          mappedGenericIDSchema
        );
        const genericIDConfigModel = await getDBModel(
          customGenericIDConfigSchema,
          "genericIDConfig"
        );
        IDConfig = await genericIDConfigModel.findOne({ module, prefix });
        if (!IDConfig) throw new Error("No ID config found");
      }
      IDConfig = retrievedIDConfig.data[0];
    }

    const customGenericIDSchema = await switchDB(
      company,
      mappedGenericIDSchema
    );
    const genericIDModel = await getDBModel(customGenericIDSchema, "genericID");

    const { _id } = IDConfig;
    if (!module || !prefix) {
      throw new Error("module or prefix or minDigit field is not declared");
    }
    let deletedID = await genericIDModel.deleteOne({
      moduleConfigID: mongo.ObjectId(_id),
      ID,
    });
    return { ok: 1, ID: deletedID, message: ID + " deleted successfully" };
    // return IDConfig
  } catch (error) {
    return { ok: 0, message: error.message };
  }
};
/**
 *
 * @param {String} company
 * @param {Object} moduleConfig
 * @returns
 */
const createGenericIDModuleConfig = async (company, moduleConfig) => {
  try {
    const customGenericIDSchema = await switchDB(
      company,
      mappedGenericIDConfigSchema
    );
    const genericIDModel = await getDBModel(
      customGenericIDSchema,
      "genericIDConfig"
    );

    const {
      module,
      subModule,
      prefix,
      minDigit,
      delimeter = "",
    } = moduleConfig;
    if (!module || !prefix || !minDigit || !subModule) {
      throw new Error(
        "module or prefix or minDigit or subModule field is not declared"
      );
    }
    let configuredModule = await genericIDModel.findOneAndUpdate(
      { module, prefix, subModule },
      moduleConfig,
      { upsert: true, new: true }
    );
    let allModules = await genericIDModel.find();
    await ADD_TO_REDIS_JSON(company + ".IDModules", allModules);
    return { ok: 1, data: configuredModule };
  } catch (error) {
    return { ok: 0, message: error.message };
  }
};

module.exports = {
  createGenericID,
  createGenericIDModuleConfig,
  deleteGenericID,
};
