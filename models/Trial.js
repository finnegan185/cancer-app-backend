const trialCollection = require("../db").db().collection("trials");

let Trial = function (trialNumber, type, stage, mutation, lineOfTherapy, needsMeasurable, lifeExpectancy) {
  this.trialNumber = trialNumber;
  this.type = type;
  this.stage = stage;
  this.mutation = mutation;
  this.lineOfTherapy = lineOfTherapy;
  this.needsMeasurable = needsMeasurable;
  this.lifeExpectancy = lifeExpectancy;
};

Trial.getMultiSelectDataByField = function (field) {
  return new Promise(async (resolve, reject) => {
    try {
      const fieldData = await trialCollection.distinct(field);
      resolve(fieldData.filter((n) => n));
    } catch (error) {
      console.log(error);
      reject("Accessing the database data failed.");
    }
  });
};

Trial.querySwitch = function (criteria) {
  let query = [];
  criteria.forEach((el) => {
    switch (el.id) {
      case "type":
        query.push({ type: { $elemMatch: { $in: el.selectedData } } });
        break;
      case "stage":
        query.push({ stage: { $elemMatch: { $in: el.selectedData } } });
        break;
      case "mutation":
        query.push({ mutation: { $elemMatch: { $in: el.selectedData } } });
        break;
      case "line":
        query.push({ line: { $elemMatch: { $in: el.selectedData } } });
        break;
      case "expectancy":
        query.push({ expectancy: { $in: el.selectedData } });
        break;
      case "needsMeasurable":
        query.push({ needsMeasurable: el.needsMeasurable === true ? "Yes" : "No" });
        break;
      default:
        break;
    }
  });
  return query;
};

Trial.getSearchResults = function (criteria) {
  return new Promise(async (resolve, reject) => {
    try {
      const query = this.querySwitch(criteria);
      const competingTrialsResponse = trialCollection.find({ $and: query });
      const competingTrials = [];
      await competingTrialsResponse.forEach((trial) => {
        competingTrials.push(trial);
      });
      resolve(competingTrials);
    } catch (error) {
      reject(error);
    }
    reject("Accessing the database data failed.");
  });
};

Trial.getAllTrials = function () {
  return new Promise(async (resolve, reject) => {
    try {
      const allTrialsResponse = trialCollection.find({});
      const allTrials = [];
      await allTrialsResponse.forEach((trial) => {
        allTrials.push(trial);
      });
      resolve(allTrials);
    } catch (error) {
      console.log(error);
      reject(error);
    }
    reject("Accessing the database data failed.");
  });
};

module.exports = Trial;
