const newrelic = require('newrelic');
const express = require('express');
const db = require('../../../database-psql/index');
const debug = require('debug')('app:*');


const router = express.Router();

router.post('/', (req, res, next) => {
  debug(`post request from booking component: accomodations ID ${req.body.listingID}`);
  res.status(201).json({
    message: 'post request with the following data recieved by server',
    data: req.body,
  });
});
  
  router.get('/:id', (req, res, next) => {
    let { id } = req.params;
    console.log(id)
    debug(`ID: ${id}`);

  db.queryAllDbTablesByRoomId(id, (error, results) => {
    if (error) {
      debug(error[0]);
    } else {
      debug(results);
      res.status(200).json({
        results,
      });
    }
  });
});

module.exports = router;
