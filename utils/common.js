class CommonUtils {

	/**
	 * Cleans data to get rid of units in tenor and yield
	 * @param {*} data 
	 */
  cleanData(data) {
    data.forEach((item) => {
      item["tenor"] = item["tenor"].split(" ")[0];
      item["yield"] = item["yield"].split("%")[0];
    });
    return data;
  }

	/**
	 * Removes objects that contains any null field in input data
	 * @param {*} data 
	 */
  removeNullItems(data) {
    const isEmpty = (object) =>
      Object.values(object).some((x) => x === null || x === "");
    return data.filter((x) => !isEmpty(x));
  }

	/**
	 * Generates separate individual list for corporate and government bonds
	 * @param {*} data 
	 */
  generateSeparateList(data) {
    const corpBonds = [],
      govtBonds = [];
    data.forEach((x) => {
      if (x.type === "government") {
        govtBonds.push(x);
      } else if (x.type === "corporate") {
        corpBonds.push(x);
      }
		});
    return [corpBonds, govtBonds];
  }

	/**
	 * Finds the closest item to the target in the array
	 * @param {*} target target number
	 * @param {*} array input data
	 * @param {*} tiebreaker  key in the array that will be used as the tiebreaker
	 */
  findClosestItem(target, array, tiebreaker) {
    return array.reduce((a, b) => {
      const aDiff = Math.abs(a.tenor - target);
      const bDiff = Math.abs(b.tenor - target);

      if (aDiff == bDiff) {
        return a[tiebreaker] > b[tiebreaker] ? a : b;
      } else {
        return bDiff < aDiff ? b : a;
      }
    });
  }

	/**
	 * Generates the output result data
	 * @param {*} corpBonds corporate bonds
	 * @param {*} govtBonds government bonds
	 */
  generateResult(corpBonds, govtBonds) {
    let a = 0;
    let resultData = [];
    corpBonds.sort((a, b) => a.tenor - b.tenor);
    govtBonds.sort((a, b) => a.tenor - b.tenor);
    while (a < corpBonds.length) {
      const closestBond = this.findClosestItem(
        corpBonds[a].tenor,
        govtBonds,
        "amount_outstanding"
			);
      const bpsValue = this.calcBps(corpBonds[a].yield, closestBond.yield);
      resultData.push({
        corporate_bond_id: corpBonds[a].id,
        government_bond_id: closestBond.id,
        spread_to_benchmark: `${bpsValue} bps`,
      });
      a++;
    }
    return { result: { data: resultData } };
  }

	/**
	 * Calculate BPS based on the input yields
	 * @param {*} yieldOne 
	 * @param {*} yieldTwo 
	 */
  calcBps(yieldOne, yieldTwo) {
    return Math.round((yieldOne - yieldTwo) * 100);
	}
	
}
module.exports = CommonUtils;