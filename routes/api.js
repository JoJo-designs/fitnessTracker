const router = require("express").Router();
const Workout = require("../models/workout.js");
const Exercises = require("../models/exercises.js");

// Attempt to get data from the database
router.get('/api/data', (req, res) => {
    Workout.find({})
    .sort({ date: 1})
    .then(Workouts => {
        res.json(Workouts)
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

module.exports = router;