const db = require('../database-psql/index');
const fake = require('./dataGenerator');
const debug = require('debug')('app:*');
const fs = require('fs');

const accomodationsInfo = fake.generateAccomodationsInfo(5000000);
const reviews = fake.generateReviews(5000000);
const users = fake.generateUsers(10000000);
const reservations = fake.generateReservations(10000000);
const owners = fake.generateOwners(5000000);

var wstream = fs.createWriteStream('./accomodations.csv');
  accomodationsInfo.map(elem =>  
  wstream.write(elem + '\n')
)

var wstreamReviews = fs.createWriteStream('./reviews.csv');
  reviews.map(elem =>  
  wstreamReviews.write(elem + '\n')
)

var wstreamUsers = fs.createWriteStream('./users.csv');
  users.map(elem =>  
  wstreamUsers.write(elem + '\n')
)

var wstreamReservations = fs.createWriteStream('./reservations.csv');
  reservations.map(elem =>  
  wstreamReservations.write(elem + '\n')
)

var wstreamOwners = fs.createWriteStream('./owners.csv');
  owners.map(elem =>  
  wstreamOwners.write(elem + '\n')
)

db.insertIntoDB("COPY owners(ownername, accomodations) FROM '/Users/patricia/Desktop/patricia-booking-service/fake-data-sdc/owners.csv' HEADER CSV", (error, results) => {
  if (error) {
    debug(`Error log debugger owners: ${error}`);
  } else {
    debug(`Success owners: ${results}, changedRows: ${results.rowsCount}`);
  }
})

db.insertIntoDB("COPY accomodations(owner_id, maxGuests, price, minStay, cleaingFee, AreaTax) FROM '/Users/patricia/Desktop/patricia-booking-service/fake-data-sdc/accomodations.csv' HEADER CSV", (error, results) => {
  if (error) {
    debug(`Error log debugger accomodations: ${error}`);
  } else {
    debug(`Success accomodations: ${results}, changedRows: ${results.rowsCount}`);
  }
})


db.insertIntoDB("COPY reviews(reviews_id, rating, accomodations_id) FROM '/Users/patricia/Desktop/patricia-booking-service/fake-data-sdc/reviews.csv' HEADER CSV" , (error, results) => {
    if (error) {
        debug(`Error log debugger reviews: ${error}`);
      } else {
        debug(`Success reviews: ${results}, changedRows: ${results.rowsCount}`);
      }
})

db.insertIntoDB("COPY reservations(reservations_id, accomodations_id, users_id, from_date, end_date) FROM '/Users/patricia/Desktop/patricia-booking-service/fake-data-sdc/reservations.csv' HEADER CSV", (error, results) => {
    if (error) {
      debug(`Error log debugger reservations: ${error}`);
    } else {
      debug(`Success reservations: ${results}, changedRows: ${results.rowsCount}`);
    }
  })

db.insertIntoDB("COPY users(username, recomendations) FROM '/Users/patricia/Desktop/patricia-booking-service/fake-data-sdc/users.csv' HEADER CSV", (error, results) => {
    if (error) {
      debug(`Error log debugger users: ${error}`);
    } else {
      debug(`Success users: ${results}, changedRows: ${results.rowsCount}`);
    }
  })

  

