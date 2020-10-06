const assert = require("chai").assert;
const CommonUtils = require("../../utils/common");
const chai = require("chai");
const should = chai.should();
const expect = chai.expect;
const sampleData = require("../../sample_input.json");
const sampleOutput = require("../../sample_output.json");

describe("commonUtils", () => {

  it("should return correct bps value", () => {
    const commonUtils = new CommonUtils();
    commonUtils.calcBps(5.3, 3.7).should.equal(160);
  });

  it("should generate separate list for corporate and govt bonds", () => {
    const commonUtils = new CommonUtils();
    resultData = [
      [
        {
          id: "c1",
          type: "corporate",
          tenor: "10.3 years",
          yield: "5.30%",
          amount_outstanding: 1200000,
        },
        {
          id: "c2",
          type: "corporate",
          tenor: "13.5 years",
          yield: null,
          amount_outstanding: 1100000,
        },
      ],
      [
        {
          id: "g1",
          type: "government",
          tenor: "9.4 years",
          yield: "3.70%",
          amount_outstanding: 2500000,
        },
        {
          id: "g2",
          type: "government",
          tenor: "12.0 years",
          yield: "4.80%",
          amount_outstanding: 1750000,
        },
      ],
    ];
    commonUtils.generateSeparateList(sampleData.data).should.eql(resultData);
  });

  it("should find the closest item for given array and target", () => {
    const data = [
      {
        id: "c1",
        type: "corporate",
        tenor: "10.3",
        yield: "5.30",
        amount_outstanding: 1200000,
      },
      {
        id: "g1",
        type: "government",
        tenor: "9.4",
        yield: "3.70",
        amount_outstanding: 2500000,
      },
      {
        id: "g2",
        type: "government",
        tenor: "12.0",
        yield: "4.80",
        amount_outstanding: 1750000,
      },
    ];
    const result = {
      id: "g1",
      type: "government",
      tenor: "9.4",
      yield: "3.70",
      amount_outstanding: 2500000,
    };
    const commonUtils = new CommonUtils();
    commonUtils
      .findClosestItem(3.7, data, "amount_outstanding")
      .should.eql(result);
	});
	
	it('should generate the result data', () => {
		const corpBonds = [
      {
        id: "c1",
        type: "corporate",
        tenor: "10.3",
        yield: "5.30",
        amount_outstanding: 1200000,
			}]
			const govtBonds = [
      {
        id: "g1",
        type: "government",
        tenor: "9.4",
        yield: "3.70",
        amount_outstanding: 2500000,
      },
      {
        id: "g2",
        type: "government",
        tenor: "12.0",
        yield: "4.80",
        amount_outstanding: 1750000,
      },
		];

		const commonUtils = new CommonUtils();
    commonUtils
      .generateResult(corpBonds, govtBonds)
      .should.eql(sampleOutput);
	})
});
