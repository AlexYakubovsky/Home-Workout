const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/training/:id', (req, res) => {
	const data = getTrainingsFromDB(),
		currentTraining = data.find(training => training.id === req.params.id);

	res.send(currentTraining);
});

router.get('/api/training/:id/exercise', (req, res) => {
		const data = getTrainingsFromDB(),
				currentExercises = data.find(exercise => exercise.id === req.params.id);

		res.send(currentExercises);
});

function getTrainingsFromDB() {
		return JSON.parse(fs.readFileSync(config.get('database.training'), 'utf8'));
}

module.exports = router;