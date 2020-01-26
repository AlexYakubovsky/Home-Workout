const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/trainings', (req, res) => {
		res.send(fs.readFileSync(config.get('database.training'), 'utf8'));
});

module.exports = router;