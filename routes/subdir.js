const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/')
    .get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, '..', 'views', 'subdir', 'index.html'), (err) => {
            if (err) throw err;
            console.log('transfer completed');
        })
    });

router.route('/test(.html)?')
    .get((req, res) => {
        res.status(200).sendFile(path.join(__dirname, '..', 'views', 'subdir', 'test.html'))
    })

module.exports = router;