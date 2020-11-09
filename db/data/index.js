const testData = require("./test-data/index.js");
const devData = require("./development-data/index.js");

const ENV = process.env.NODE_ENV || "development";

const allData = {
  development: devData,
  test: testData,
};

console.log(allData[ENV]);
module.exports = allData[ENV];
