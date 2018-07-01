const randomNames = require('random-name');
const Chance = require('chance'),
    chance = new Chance();

const random = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

const getRandomStay = (max) => {
    var result = 2
    var value = Math.floor(Math.random() * Math.floor(max))
    if (value > 2 && typeof value === 'number') {
        result = value;
    }
    return result;
};

const costModifier = (min, max, guests) => {
    const minModifier = Math.floor(min * (1 + (guests * 0.25)));
    const maxModifier = Math.floor(max * (1 + (guests * 0.25)));
    return random(minModifier, maxModifier);
  };

const generateAccomodationsInfo = (accomodations) => {
  const accomodationsInfo = [['owner_id', 'maxGuests', 'minStay', 'price', 'cleaning_fee', 'acc_tax']];
  for (let i = 0; i <= accomodations; i += 1) {
      const owner_id = i + 1;
      const maxGuests = random(10);
      const minStay = getRandomStay(12);
      const per_night_value = costModifier(5, 15, maxGuests) * 100;
      const cleaning_fee = costModifier(5, 15, maxGuests) * 50;
      const acc_tax = costModifier(5, 15, maxGuests) * 50;
      accomodationsInfo.push([owner_id, maxGuests, per_night_value, minStay, cleaning_fee, acc_tax])
  }
  return accomodationsInfo;
};

const generateReviews = (reviews) => {
    const totalreviews = [['reviews_id', 'rating', 'accomodations_id']];
    for (let i = 0; i <= reviews; i += 1) {
      const reviews_id = i;
      const rating = random(5);
      const accomodations_id = i + 1;
        totalreviews.push([reviews_id, rating, accomodations_id])
    }
    return totalreviews;
};

const generateUsers = (users) => {
    const totalUsers = [['username', 'recomendations']];
    for (let i = 0; i <= users; i += 1) {
      const username = randomNames.first();
      const recomendations = random(5);
      totalUsers.push([username, recomendations])
    }
    return totalUsers;
};

const generateReservations = (reservations) => {
    const totalReservations = [['Reservations_ID', 'accomodations_id', 'User_ID', 'From', 'To']];
    for (let i = 0; i <= reservations; i += 1) {
      const reservations_id = random(reservations);
      const accomodations_id = i + 1;
      const user_id = i + 1;
      const from = chance.date({string: true, year: 2018})
      const to = chance.date({string: true, year: 2019})
      totalReservations.push([reservations_id, accomodations_id, user_id, from, to])
    }
    return totalReservations;
};

const generateOwners = (owners) => {
    const totalOwners = [['ownername', 'accomodations']];
    for (let i = 0; i <= owners; i += 1) {
      const ownername = randomNames.first();
      const accomodations = random(10);
      totalOwners.push([ownername, accomodations])
    }
    return totalOwners;
};


module.exports = {
    generateAccomodationsInfo,
    generateReviews,
    generateUsers,
    generateReservations,
    generateOwners 
  };