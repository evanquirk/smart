const { Client } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Client(dbParams);

module.exports = { db };
