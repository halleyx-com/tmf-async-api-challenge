let {
  clone,
  filter,
  add,
  getAll,
  update,
  deleteOne,
  getById,
  search,getByname
} = require('../Services/crudService');
const crudRouter = (fastify, options, next) => {
  try {
    fastify.get('/inlineSearch', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let pageNo = parseInt(req.query.pageNo);
        let size = parseInt(req.query.size);
        let query = {};
        query.sort = { name: -1 };
        query.skip = size * (pageNo - 1);
        query.limit = size;
        let created = await search(
          'productSpecification',
          company,
          req.query,
          query
        );
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.get('/filterSearch', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let pageNo = parseInt(req.query.pageNo);
        let size = parseInt(req.query.size);
        let query = {};
        query.sort = { name: -1 };
        query.skip = size * (pageNo - 1);
        query.limit = size;
        let created = await filter(
          'productSpecification',
          company,
          req.query,
          query
        );
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });
    fastify.post('/', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await add(
          "productSpecification",
          company,
          req.body,
          "Halleyx"
        );
       
        res.code(201).send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.post('/clone', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await clone(
          "productSpecification",
          company,
          req.body,
          "Halleyx"
        );
        res.code(201).send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.get('/', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let pageNo = parseInt(req.query.pageNo);
        let size = parseInt(req.query.size);
        let query = {};
        query.sort = { lastUpdate: -1 };
        query.skip = size * (pageNo - 1);
        query.limit = size;
        let created = await getAll('productSpecification', company, query);
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.patch('/', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await update(
          "productSpecification",
          company,
          req.body,
          "Halleyx"
        );
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.delete('/:id', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await deleteOne(
          "productSpecification",
          company,
          req.params.id,
          "Halleyx"
        );
        res.code(204).send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.get('/:id', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await getById(
          'productSpecification',
          company,
          req.params.id
        );
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    fastify.get('/name/:id', async (req, res, next) => {
      try {
        const { company } = "Halleyx";
        let created = await getByname(
          'productSpecification',
          company,
          req.params.id
        );
        res.send(created);
      } catch (error) {
        res.code(400).send(error);
      }
    });

    next();
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = crudRouter;
