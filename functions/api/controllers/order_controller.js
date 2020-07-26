const OrderModel = require("../models/order_model");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await OrderModel.get();
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Get one Order
router.get("/:id", async (req, res, next) => {
  try {
    const result = await OrderModel.getById(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

// Create a Order
router.post("/", async (req, res, next) => {
  try {
    const result = await OrderModel.create(req.body);
    if (!result) return res.sendStatus(409);
    return res.status(201).json(result);
  } catch (e) {
    return next(e);
  }
});

// Delete a Order
router.delete("/:id", async (req, res, next) => {
  try {
    const result = await OrderModel.delete(req.params.id);
    if (!result) return res.sendStatus(404);
    return res.sendStatus(200);
  } catch (e) {
    return next(e);
  }
});

// Update a Order
router.patch("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const doc = await OrderModel.getById(id);
    if (!doc) return res.sendStatus(404);

    Object.keys(data).forEach((key) => (doc[key] = data[key]));

    const updateResult = await OrderModel.update(id, doc);
    if (!updateResult) return res.sendStatus(404);

    return res.json(doc);
  } catch (e) {
    return next(e);
  }
});

// Replace a Order
router.put("/:id", async (req, res, next) => {
  try {
    const updateResult = await UserModel.update(req.params.id, req.body);
    if (!updateResult) return res.sendStatus(404);

    const result = await UserModel.getById(req.params.id);
    return res.json(result);
  } catch (e) {
    return next(e);
  }
});

module.exports = router;