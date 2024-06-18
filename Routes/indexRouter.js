const productSpecification = require("./productSpecRouter");

const indexRouter = (fastify, options, next) => {
  try {
    fastify.register(productSpecification, { prefix: "/cataloganagement/productSpecification" });

    next();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = indexRouter;
