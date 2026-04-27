import sequelize from '../config/db.config.js';
import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = {};

async function initializeModels() {
    const files = await fs.readdir(__dirname);

    for (const file of files) {
        if (file.endsWith('.js') && file !== 'index.js') {
            const { default: defineModel } = await import(path.join(__dirname, file));
            const model = defineModel(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
        }
    }

    // Run associate functions if defined
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

export default await initializeModels();
