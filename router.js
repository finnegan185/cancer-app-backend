const apiRouter = require("express").Router();
const trialController = require("./controllers/trialController");

const cors = require("cors");

apiRouter.use(cors());

// Search Routes
apiRouter.post("/competing-search-get-data", trialController.apiGetMultiSelectData);
apiRouter.post("/competing-search-results", trialController.apiGetSearchResults);

apiRouter.get("/all-trials", trialController.apiGetAllTrials);

module.exports = apiRouter;
