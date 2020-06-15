const router = require('express').Router();
let Exercise = require('../models/exercise.model');
const { route } = require('./users');
const { json } = require('express');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json("Error: " + err));
});

// Add an exercise
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch( err => res.send(400).json('Error: ' + err));
});

// Show specific exercise:
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error getting exercise with id: ${req.params.id}: ` + err));
});

// Delete exercise:
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json(`Error deleting exercise with id: ${req.params.id}: ` + err));
});

// Update Exercise:
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json(`Error updating (within the update method) post with id: ${req.params.id}: ` + err));
        })
        .catch(err => res.status(400).json(`Error updating post with id: ${req.params.id}: ` + err));
});

module.exports = router;