
class CommonUtils {

	cleanData (data) {
		data.forEach(item => {
			item['tenor'] = item['tenor'].split(' ')[0];
			item['yield'] = item['yield'].split('%')[0]
		});
		return data;
	}

	removeNullItems (data) {
		const isEmpty = (object) => Object.values(object).some(x => (x === null || x === ''));
		return data.filter(x => !isEmpty(x));
	}

	generateSeparateList (data) {
		const corporateBonds = [], govtBonds = [];
		data.forEach(x => {
			if(x.type === "government") {
				govtBonds.push(x);
			} else if(x.type === "corporate") {
				corporateBonds.push(x);
			}
		});
		return [corporateBonds, govtBonds];
	}

	findClosestItem (item, array) {
		return array.reduce((a, b) => {
			let aDiff = Math.abs(a.tenor - item);
			let bDiff = Math.abs(b.tenor - item);

			if (aDiff == bDiff) {
					return a.amount_outstanding > b.amount_outstanding ? a : b;
			} else {
					return bDiff < aDiff ? b : a;
			}
		});
	}

	generateResult (arr1, arr2) {
		arr1.sort((a, b) => a.tenor - b.tenor);
		arr2.sort((a, b) => a.tenor - b.tenor);
		let result = {
			data: []
		};
		let a= 0;
		while(a < arr1.length) {
			const closestItem= this.findClosestItem(arr1[a].tenor, arr2);
			result.data.push({
				corporate_bond_id: arr1[a].id,
				government_bond_id: closestItem.id,
				spread_to_benchmark: `${Math.round((arr1[a].yield - closestItem.yield)*100)} bps`
			})
			a ++;
		}
		return result;
	}
	
}
module.exports = CommonUtils;