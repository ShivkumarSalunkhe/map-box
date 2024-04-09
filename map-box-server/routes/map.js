// routes/map.js
const express = require("express");
const router = express.Router();
const Map = require("../models/map");
// Create a data
router.post("/", async (req, res) => {
  const polyData = new Map({
    polygonName: req.body.polygonName,
    polygonCoordinates: req.body.polygonCoordinates,
  });

  try {
    const newTask = await polyData.save();
    res
      .status(200)
      .send({ messageKey: "Success", message: "Polygon added successfully" });
  } catch (err) {
    res.status(400).json({ messageKey: "Error", message: err.message });
  }
});

// Get all polygons
router.get("/", async (req, res) => {
  try {
    const data = await Map.find();
    res.json({
      messageKey: "Success",
      message: "Polygons retrieved successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ messageKey: "Error", message: err.message });
  }
});


module.exports = router;
