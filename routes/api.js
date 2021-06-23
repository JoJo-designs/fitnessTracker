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

// THIS ONE FIRST
// async getLastWorkout() {
//   let res;
//   try {
//     res = await fetch("/api/workouts");
//   } catch (err) {
//     console.log(err)
//   }
//   const json = await res.json();

//   return json[json.length - 1];
// },

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
    .then(workout => {
      res.json(workout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


// const res = await fetch("/api/workouts/" + id, {
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(data)
// });

router.put("/api/workouts/:id", ({body}, res) => {
  Workout.create(body)
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});


// async createWorkout(data = {}) {
//   const res = await fetch("/api/workouts", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: { "Content-Type": "application/json" }
//   });

//   const json = await res.json();

//   return json;
// },

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
  .then(workout => {
    res.json(workout);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});





// async getWorkoutsInRange() {
//   const res = await fetch(`/api/workouts/range`);
//   const json = await res.json();

//   return json;
// },

module.exports = router;