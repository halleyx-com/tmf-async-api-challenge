require('dotenv').config();
const passport = require('passport');
// const cors = require('cors');
const cors = require('@fastify/cors');
// const uuidv4 = require('uuid/v4');
// const createRequestId = () => uuidv4();
const { IS_LOGGER, REDIS_URI } = process.env;
const fastify = require('fastify');
// Connect MongoDB
require('./connection');
// Connect Redis

// imoprt qs
const qs = require('qs');
function build() {
  const Fastify = fastify({
    trustProxy: true,
    ignoreTrailingSlash: true,
    querystringParser: (str) => qs.parse(str),
    // logger: {
    //   genReqId: createRequestId,
    //   level: 'info'
    // }
  });
  return Fastify;
}

(async () => {
  // Google Cloud Run will set this environment variable for you, so
  // you can also use it to detect if you are running in Cloud Run
  const IS_GOOGLE_CLOUD_RUN = process.env.K_SERVICE !== undefined;

  // You must listen on the port Cloud Run provides
  const port = process.env.PORT || 5600;

  // You must listen on all IPV4 addresses in Cloud Run
  const host = IS_GOOGLE_CLOUD_RUN ? '0.0.0.0' : 'localhost';

  try {
    const server = build();
    const corsOptions = {
      origin: "*",
      methods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS',,'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'x-client-key',
        'hlx-api-key',
        'x-client-token',
        'x-client-secret',
        'Authorization',
      ],
      exposedHeaders: ['Content-Disposition'],
      credentials: true,
      // Add CSP header
      additionalHeaders: {
        'Content-Security-Policy':
          "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'",
      },
    };
    server.register(cors,corsOptions);
    server.register(require('@fastify/multipart'))
    server.register(passport.initialize());
// add prehandler for all routes
    // server.addHook('preHandler', (req, res, next) => {
    //   console.log('🚀 ~ req:', req.originalUrl.split('/'));
    //   req.module = req.originalUrl.split('/')[1];
    //   next();
    // });

    const indexRouter = require('./Routes/indexRouter');
    server.register(indexRouter, { prefix: '/' });
    server.get('/', (req, rep) => {
      rep.send('Welcome to UPC server 2.0 🖥️ 🛜 fasty world');
    });
    server.setErrorHandler((error, request, reply) => {
      reply.status(500).send(error);
    });
    // Register parent error handler
    server.listen({ port, host }, function (err, address) {
      if (err) {
        console.log('🚀 ~ err:', err);
        server.log.error(err);
      }
      console.log(`Listening on ${address}`);
    });
  } catch (err) {
    console.error(err);
    // process.exit(1);
  }
})();

module.exports = build;
