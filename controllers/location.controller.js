const { Location } = require("../models/godown.model");

exports.getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createLocation = async (req, res) => {
  try {
    const { name, is_godown, parent_id } = req.body;

    // Validate input
    if (!name || typeof is_godown !== "boolean") {
      return res
        .status(400)
        .json({ message: "Name and is_godown are required fields" });
    }

    const locationData = {
      name,
      is_godown,
    };

    if (is_godown) {
      if (parent_id) {
        const parentGodown = await Location.findById(parent_id);
        if (!parentGodown || !parentGodown.is_godown) {
          return res
            .status(400)
            .json({ message: "Invalid parent_id: parent godown not found" });
        }
        locationData.parent_id = parent_id;
      }
    } else {
      if (!parent_id) {
        return res
          .status(400)
          .json({ message: "parent_id is required for non-godown locations" });
      }
      const parentGodown = await Location.findById(parent_id);
      if (!parentGodown || !parentGodown.is_godown) {
        return res
          .status(400)
          .json({ message: "Invalid parent_id: parent godown not found" });
      }
      locationData.parent_id = parent_id;
    }

    const location = new Location(locationData);
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    if (req.body.name) location.name = req.body.name;
    if (req.body.parent_id !== undefined)
      location.parent_id = req.body.parent_id;
    if (req.body.is_godown !== undefined)
      location.is_godown = req.body.is_godown;

    const updatedLocation = await location.save();
    res.json(updatedLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location)
      return res.status(404).json({ message: "Location not found" });

    await location.deleteOne();
    res.json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
