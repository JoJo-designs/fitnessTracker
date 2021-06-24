const router = require("express").Router();
const Workout = require("../models/workout.js");

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


// adds a new workout to the table but i need it to update just one
router.put("/api/workouts/:id", ({body}, res) => {
  Workout.update(body)
  .then(workouts => {
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  });
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