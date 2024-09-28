import Logging from "utils/logging.util";
import express from 'express';
import cors from 'cors';
import { APIError } from 'errors/api.error';
import { errorHandler } from "middleware/error.middleware";
import routes from "./routes";

process.on('uncaughtException', (e) => {
  Logging.error(e);
});

const app = express();

const options: cors.CorsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

app.use(cors(options));

app.use(express.json({ limit: '10mb' }));

app.use(
  express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }),
);

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
      /** Log the res */
      Logging.info(`Result - METHOD: [${req.protocol}://${req.get('host')}${req.originalUrl}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
  });

  next();
});

app.use(express.urlencoded({ extended: true }));

process.setMaxListeners(0);

app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method == 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }

  next();
});

app.get('/ping', (_, res, __) => res.status(200).json({ hello: 'world' }));

app.use('/api/v1/', routes);

app.use((_, __, next) => next(new APIError(404, '404 error')));

app.use(errorHandler);

export default app;
