const Trial = require("../models/Trial");

exports.apiGetMultiSelectData = async function (req, res) {
  try {
    let promises = [];
    req.body.fields.forEach((field) => {
      promises.push(Trial.getMultiSelectDataByField(field));
    });
    const fieldsData = await Promise.all(promises);
    if (fieldsData.length) {
      res.status(200).send(fieldsData);
    } else {
      res.status(204).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("failure");
  }
};

exports.apiGetSearchResults = async function (req, res) {
  try {
    const competingTrials = await Trial.getSearchResults(req.body.searchData);
    if (competingTrials.length) {
      res.status(200).send(competingTrials);
    } else {
      res.status(204).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("failure");
  }
};

exports.apiGetAllTrials = async function (req, res) {
  try {
    const allTrials = await Trial.getAllTrials();
    if (allTrials.length) {
      res.status(200).send(allTrials);
    } else {
      res.status(204).send(null);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("failure");
  }
};
