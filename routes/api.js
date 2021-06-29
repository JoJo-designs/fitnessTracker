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



router.put("/api/workouts/:id", ({body, params}, res) => {
    // ADD EXERCISE WORKING AS OF 6/24
  console.log(body)
  Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    { new: true, runValidators: true }
  )
    .then((data) => {
      console.log(data)
      res.json(data)
    })
    .catch((err) => {
      console.log(err)
    })
});

// adds a new workout. 
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(workouts => {
    console.log(workouts);
    res.json(workouts);
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  });
});

// doesn't work.
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: '$exercises.duration',
        },
      },
    },
  ])
  .sort({ date: -1 })
  .then(workouts => {
    console.log(workouts)
    res.json(workouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

module.exports = router;