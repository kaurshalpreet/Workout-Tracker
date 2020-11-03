const router = require("express").Router();
const db = require("../models/db.js");

router.post("/api/workouts" , ({ body }, res) => {
    db.create(body)
    .then(dbWorkout => {
        console.log(dbWorkout, "Exercise added successfully")
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts", (req, res) => {
    db.find({})
    .sort({ date: -1 })
    .then(dbWorkout => {
        console.log("Get Exercise successfully", dbWorkout)
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
    db.find({}).limit(14)
        .sort({ date: -1 })
        .then(dbWorkout => {
            console.log("Successfully got the range route", dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", (req, res) => {
    db.findByIdAndUpdate(req.params.id, { $push: { exercises: req.body } }, { new: true })
        .then(dbWorkout => {
            console.log("Successfully updated the exercise", dbWorkout)
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

module.exports = router

