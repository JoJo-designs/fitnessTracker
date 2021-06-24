const router = require("express").Router();
const { db } = require("../models/workout.js");
const Workout = require("../models/workout.js");
const Exercise = require("../models/exercises.js");

// router to each html page I think.
router.get("/exercise", function (req, res) {
  res.redirect('exercise.html')
})

router.get("/stats", function (req, res) {
  res.redirect('stats.html')
})

// if you get lost, look at api.js in public folder
/**
 * make route for each of these calls and delete commented
 * code as you go
 */


// gets all the data with the duration field added to the response.
router.get("/api/workouts", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          // basically adding up the
          // duration of our excercises
          $sum: '$exercises.duration',
        },
      },
    },
  ])
    .then(workouts => {
      res.json(workouts);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// adds a new workout to the table but i need it to add a new exercises to just one
router.put("/api/workouts/:id", ({body}, res) => {
  // Workout.updateOne(body)
  // .then(workouts => {
  //   res.json(workouts);
  // })
  // .catch(err => {
  //   res.status(400).json(err);
  // });
  let exercisesOdj = { 
    type: body.type,
    name: body.name, 
    duration: body.duration,
    weight: body.weight,
    reps: body.reps,
    sets: body.sets
    }
    Workout.findOneAndUpdate(
      { id: body.id },
      { $push: { exercise: exercisesOdj } },
      function (err, success) {
        if (err) {
          console.log(err)
        } else {
          res.json(success)
        }
      }
    ) 
});

// adds a new workout. 
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(workouts => {
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


// doesn't work.
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addfields: {
        totalRange: {
          $sum: '$exercises.distance',
        },
      },
    },
  ])
  .then(workouts => {
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

module.exports = router;