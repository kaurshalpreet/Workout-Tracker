const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },

  exercises: [{

  type: {
    type: String,
    trim: true,
    required: true
  },

  name: {
    type: String,
    trim: true,
    required: true
  },

  duration: {
    type: Number
  },

  distance: {
    type: String
  },

  weight: {
    type: String
  },

  reps: {
    type: String
  },

  sets: {
    type: String
  },
  }],
},
{
    toJSON: {
        virtuals: true
    }
}
); 

// adds a dynamically-created property "totalDuration" to schema
workoutSchema.virtual("totalDuration").get(function () {
// "reduce" array of exercises down to the sum of their durations
  return this.exercises.reduce((total, exercise) => {
  return total + exercise.duration;
  }, 0);
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
