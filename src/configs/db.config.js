import { Sequelize } from 'sequelize';
import { config } from './env.config.js';

const isProd = config.NODE_ENV === 'production';
const isDev = config.NODE_ENV === 'development';

const pool = {
  max: isProd ? 20 : 5,
  min: isProd ? 2 : 0,
  acquire: 30_000,
  idle: isProd ? 10_000 : 5_000,
  evict: 1_000,
};

const dialectOptions = {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
  statement_timeout: isProd ? 30_000 : 0,
  idle_in_transaction_session_timeout: 60_000,
};

const sequelize = new Sequelize(config.DATABASE_URL, {
  dialect: 'postgres',
  logging: isDev ? (sql) => console.debug('[SQL]', sql) : false,
  pool,
  dialectOptions,
  retry: {
    max: 3,
  },
});

export default sequelize;
