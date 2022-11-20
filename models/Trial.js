const trialCollection = require("../db").db().collection("trials");

let Trial = function (trialNumber, type, stage, mutation, lineOfTherapy, needsMeasurabe, lifeExpectancy) {
  this.trialNumber = trialNumber;
  this.type = type;
  this.stage = stage;
  this.mutation = mutation;
  this.lineOfTherapy = lineOfTherapy;
  this.needsMeasurabe = needsMeasurabe;
  this.lifeExpectancy = lifeExpectancy;
};

Trial.getMultiSelectDataByField = function (field) {
  console.log("Fuck you?");
  return new Promise(async (resolve, reject) => {
    try {
      const fieldData = await trialCollection.distinct(field);
      resolve(fieldData);
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};

Trial.stupidSwitch = function (criteria) {
  let query = [];
  criteria.forEach((el) => {
    switch (el.id) {
      case "type":
        console.log("el.selectedData ", el.selectedData);
        console.log("el.selectedData ", [...el.selectedData]);
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
        query.push({ expectancy: { $elemMatch: { $in: el.selectedData } } });
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
      const query = this.stupidSwitch(criteria);
      const competingTrialsResponse = trialCollection.find({ $and: query });
      const competingTrials = [];
      await competingTrialsResponse.forEach((trial) => {
        competingTrials.push(trial);
      });
      resolve(competingTrials);
    } catch (error) {
      console.log(error);
      reject(error);
    }
    reject("failure");
  });
};

module.exports = Trial;
