import http from 'http';
import { config } from './configs/env.config.js';
import app from './app.js';
import db from './models/index.js';
import logger from './utils/logger.util.js';

const port = config.PORT;

const httpServer = http.createServer(app);

(async () => {
  try {
    logger.info('Connecting to DB...');
    await db.sequelize.authenticate();
    await db.sequelize.sync({ alter: true });
    logger.info('DB connected successfully.');

    httpServer.listen(port, () => {
      logger.info(`HTTPS server running on port ${port}`);
    });
  } catch (err) {
    logger.error('Startup error: %s', err.message, { stack: err.stack });
    process.exit(1);
  }
})();
