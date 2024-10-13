const express = require("express");
const router = express.Router();
const locationController = require("../controllers/location.controller");
const { authenticateToken } = require("../midddlewares/auth.middleware");

router.use(authenticateToken);

router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);
router.post("/", locationController.createLocation);
router.put("/:id", locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
