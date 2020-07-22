const membersModel = require("../models/membersize_model");
const express = require("express");
const router = express.Router();

// Get all size
router.get("/", async (req, res, next) => {
  try {
    const result = await membersModel.get();
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Get one size
router.get("/:id", async (req, res, next) => {
  try {
    const result = await membersModel.getById(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Create a new size
router.post("/", async (req, res, next) => {
  try {
    const result = await membersModel.create(req.body);
    if (!result) return res.sendStatus(409);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
});

// Delete a member size
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await membersModel.delete(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

// Update a size
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const doc = await membersModel.getById(id);
    if (!doc) return res.sendStatus(404);

    Object.keys(data).forEach((key) => (doc[key] = data[key]));

    const updateResult = await membersModel.update(id, doc);
    if (!updateResult) return res.sendStatus(404);

    return res.json(doc);
  } catch (e) {
    return next(e);
  }
});

// Replace a todo
router.put("/:id", async (req, res, next) => {
  try {
    const updateResult = await membersModel.update(req.params.id, req.body);
    if (!updateResult) return res.sendStatus(404);

    const result = await membersModel.getById(req.params.id);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;