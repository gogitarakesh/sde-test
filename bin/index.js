#!/usr/bin/env node
const yargs = require("yargs").argv;
fs = require('fs');
const CommonUtils = require("../utils/common");
const commonUtils = new CommonUtils();

const args = yargs._;
const inputPath = args[0];
const outputPath = args[1];

let rawdata = fs.readFileSync(inputPath);

let inputData = commonUtils.removeNullItems(JSON.parse(rawdata).data);

const sanitizedData = commonUtils.cleanData(inputData);

const [corporateBonds, governmentBonds] = commonUtils.generateSeparateList(sanitizedData);

const result = JSON.stringify(commonUtils.generateResult(corporateBonds, governmentBonds));

console.log("*** Calculation complete ****** \n");

console.log(`${result} \n`);

fs.writeFileSync(outputPath, result);

console.log(`*** Result copied to ${outputPath} ******`);


