const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const options = require('../swaggerOptions.js');

const output = path.resolve(__dirname, '../swagger.json');
const spec = swaggerJsdoc(options);

fs.writeFileSync(output, JSON.stringify(spec, null, 2));
console.log(`✓ swagger.json written to ${output}`);