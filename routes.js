const express = require('express');
const router = new express.Router() ;
const indexC = require('./controllers/index')

router.route('/')
	.get(indexC.index);

module.exports = router;