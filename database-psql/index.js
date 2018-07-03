
const pg = require('pg');
const debug = require('debug')('app:*');


const client = new pg.Pool({
  user: 'patricia',
  host: 'localhost',
  database: 'reservations',
  port:'5432'
});


const insertIntoDB = (sql, callback) => {
  client.connect(function (err) {
    if (err) {
        console.log("Can not connect to the DB" + err);
    }
  client.query(sql, (error, results, fields) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
});
};

const queryAccomodationsInfoByRoomId = (id, name = 'accomodations', callback) => {
  client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = ${id}`, id, (err, rows) => {
    if (err) {
      callback(err, null, name);
    } else {
      debug(rows[0]);
      callback(null, rows, name);
    }    
  });
};

const queryAccomodationsReviewsByRoomId = (id, name = 'reviews', callback) => {
  client.query(`SELECT COUNT(*) as totalReviews, SUM(rating) as starSum FROM reviews WHERE accomodations_id = ${id}`, id, (err, rows) => {
    if (err) {
      callback(err, null, name);
    } else {
      debug(rows[0]);
      callback(null, rows, name);
    }
  });
};

const queryReservationsByRoomId = (id, name = 'reservations', callback) => {
  client.query(`SELECT * FROM RESERVATIONS WHERE accomodations_id = ${id}`, id, (err, rows) => {
    if (err) {
      callback(err, null, name);
    } else {
      debug(rows[0]);
      callback(null, rows, name);
    }
  });
};

const queryOwnerInfoByRoomId = (id, name = 'owner', callback) => {
  const arr = []
  client.query(`SELECT * FROM OWNERS WHERE id = ${id}`, id, (err, rows) => {
    if (err) {
      callback(err, null, name);
    } else {
      callback(null, rows, name);
    }
  });
};

const queryAllDbTablesByRoomId = (id, callback) => {
  const num = Number(id)
  const READ_DB_OPERATIONS = 4;
  const roomRecords = {};
  const errorLog = [];
  const idWrap = [];
  let queriesComplete = 0;
  idWrap.push(num);

  const trackQueryHelper = (error, data, name) => {
    queriesComplete += 1;
    if (error) {
      debug(`error reading from database, step: ${queriesComplete}, error: ${error}`);
      errorLog.push({ name, error });
    } else {
      roomRecords[name] = data;
    }

    if (queriesComplete === READ_DB_OPERATIONS) {
      if (errorLog.length === READ_DB_OPERATIONS) {
        callback(errorLog, null);
      } else {
        roomRecords.errors = errorLog;
        callback(null, roomRecords);
      }
    }
  };

  queryAccomodationsInfoByRoomId(num, 'accomodations', trackQueryHelper);
  queryOwnerInfoByRoomId(num, 'owner', trackQueryHelper);
  queryAccomodationsReviewsByRoomId(num, 'reviews', trackQueryHelper);
  queryReservationsByRoomId(num, 'reservations', trackQueryHelper);
};

module.exports = {
  insertIntoDB,
  queryAccomodationsInfoByRoomId,
  queryAccomodationsReviewsByRoomId,
  queryOwnerInfoByRoomId,
  queryAllDbTablesByRoomId,
  queryReservationsByRoomId
}