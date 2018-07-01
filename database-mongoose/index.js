const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reservationsMongo');


let ownersSchema = mongoose.Schema ({
    ownername: {type: String},
    accomodations: {type: Number},
})

const Owners = mongoose.model('Owners', ownersSchema);

let accomodationsSchema = mongoose.Schema({
   owner_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Owners'},
   maxGuests: {type: Number},
   per_night_value: {type: Number},
   minStay: {type: Number},
   cleaning_fee: {type: Number},
   occ_tax: {type: Number},
});

const Accomodations = mongoose.model('Accomodations', accomodationsSchema);

let usersSchema = mongoose.Schema ({
    username: {type: String},
    recomendations: {type: Number},
})

const Users = mongoose.model('Users', usersSchema);

let reservationSchema = mongoose.Schema({ 
    reservation_id: {type: Number},
    accomodation_id: {type: mongoose.Schema.Types.Number, ref: 'Accomodations'},
    user_id: {type: mongoose.Schema.Types.Number, ref: 'Users'},
    checkinDate: {type: Date},
    checkoutDate:  {type: Date},
})

const Reservations = mongoose.model('Reservations', reservationSchema);

let reviewsSchema = mongoose.Schema({
  reviews_id: {type: Number},
  rating: {type: Number},
  accomodation_id: {type: mongoose.Schema.Types.Number, ref: 'Accomodations'}
}) 

const Reviews = mongoose.model('Reviews', reviewsSchema);
