const Trial = require("../models/Trial");

exports.apiGetMultiSelectData = async function (req, res) {
  try {
    let promises = [];
    req.body.fields.forEach((field) => {
      promises.push(Trial.getMultiSelectDataByField(field));
    });
    const fieldsData = await Promise.all(promises);
    res.json(fieldsData);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

exports.apiGetSearchResults = async function (req, res) {
  try {
    const competingTrials = await Trial.getSearchResults(req.body.searchData);
    if (competingTrials.length) {
      res.json(competingTrials);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
    res.json("failure");
  }
};

exports.apiGetAllTrials = async function (req, res) {
  try {
    const allTrials = await Trial.getAllTrials();
    if (allTrials.length) {
      res.json(allTrials);
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
    res.json("failure");
  }
};
