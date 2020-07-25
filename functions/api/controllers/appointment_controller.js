const apptModel = require("../models/appointment_model");

const express = require("express");
const router = express.Router();

//get all appointments
router.get("/", async (req, res, next)=>{
    try{
        const result = await apptModel.get();
        return res.json(result);
    }
    catch(e){
        return next(e);
    }
});

//get an appointment
router.get("/", async (req, res, next)=>{
    try{
        const result = await apptModel.getById(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.json(result);
    }
    catch(e){
        return next(e);
    }
});

//create an appointment
router.post("/", async (req, res, next)=>{
    try{
        const result= await apptModel.create(req.body);
        if(!result)return res.sendStatus(409);
        return res.status(201).json(result);

    }
    catch (e){
        return next(e);

    }
});

//delete an appointment
router.delete("/:id", async (req, res, next)=>{
    try{
        const result = await apptModel.delete(req.params.id);
        if (!result) return res.sendStatus(404);
        return res.sendStatus(200);

    }
    catch (e){
        return next(e);
    }
});

//update appointment
router.patch("/:id", async(res, req, next)=>{
    try{
        const id = req.params,id;
        const data = req.body;

        const doc = await apptModel.getById(id);
        if (!doc) return res.sendStatus(404);

        Object.keys(data).forEach((key)=> (doc[key] = data[key]));

        const updateResult = await apptModel.update(id, doc);
        if (!updateResult) return res,sendStatus(404);

        return res.json(doc);


    }
    catch(e){
        return next(e);
    }
});

// replace an appointment
router.put("/:id", async (res, req, next)=>{
    try{
        const updateResult = await apptModel.update(req.params.id, req.body);
        if (!updateResult) return res.sendStatus(404);

        const updateResult = await apptModel.getById(req.params.id);
        return res.json(result);
    }
    catch(e){
        return next(e);
    }
});

module.exports = router;