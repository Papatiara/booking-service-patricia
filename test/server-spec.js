const pg = require('pg');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./../server/index.js')

const should = chai.should();

chai.use(chaiHttp);

const client = new pg.Pool({
  user: 'patricia',
  host: 'localhost',
  database: 'reservations',
  port:'5432'
});

it('Should get accomodations informations by id 5', function(done) {
    chai.request(app)
    .get('/booking/5')
    .end(function(err, res) {
      client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 5`, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result.rows[0])
      res.should.have.status(200);
      chai.expect(result.rows[0].accomodations_id).to.be.a('number');
      chai.expect(result.rows[0].owner_id).to.be.a('number');
      chai.expect(result.rows[0].maxguests).to.be.a('number');
      chai.expect(result.rows[0].price).to.be.a('number');
      chai.expect(result.rows[0].minstay).to.be.a('number');
      chai.expect(result.rows[0].cleaingfee).to.be.a('number');
      chai.expect(result.rows[0].areatax).to.be.a('number');
      done();
     }
    });
  });
});

it('Should get reservations informations by id 5', function(done) {
  chai.request(app)
  .get('/booking/5')
  .end(function(err, res) {
    client.query(`SELECT * FROM RESERVATIONS WHERE accomodations_id = 5`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
    res.should.have.status(200);
    chai.expect(result.rows[0].reservations_id).to.be.a('number');
    chai.expect(result.rows[0].accomodations_id).to.be.a('number');
    chai.expect(result.rows[0].users_id).to.be.a('number');
    chai.expect(result.rows[0].from_date).to.be.a('string');
    chai.expect(result.rows[0].end_date).to.be.a('string');
    done();
   }
  });
});
});

it('Should get the reservation information by id 15', function(done) {
  chai.request(app)
  .get('/booking/15')
  .end(function(err, res) {
    client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 15`, (err, result) => {
      if (err) {
        console.log(err);
      } else {      
        res.should.have.status(200);
        done();
      }
  });
});
});

it('Should get the reservation information by id 100000', function(done) {
  chai.request(app)
  .get('/booking/100000')
  .end(function(err, res) {
    client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 10000`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.should.have.status(200);
        done();      
      }
  });
});
});

it('Should get the reservation information by id 1000000', function(done) {
  chai.request(app)
  .get('/booking/100000')
  .end(function(err, res) {
    client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 1000000`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.should.have.status(200);
        done();      
      }
  });
});
});

it('Should get the reservation information by id 150000', function(done) {
  chai.request(app)
  .get('/booking/150000')
  .end(function(err, res) {
    client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 150000`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.should.have.status(200);
        done();      
      }
  });
});
});

it('Should get the reservation information by id 10000000', function(done) {
  chai.request(app)
  .get('/booking/10000000')
  .end(function(err, res) {
    client.query(`SELECT * FROM ACCOMODATIONS WHERE accomodations_id = 10000000`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.should.have.status(200);
        done();      
      }
  });
});
});

it('Should post new reservation dates', function(done) {
  chai.request(app)
  .post('/booking')
  .end(function(err, res) {
    client.query(`INSERT INTO RESERVATIONS(reservations_id, accomodations_id, users_id, from_date, end_date) VALUES(873837, 748374, 787, 02/08/2018, 02/15/2018)`, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        done();      
      }
  });
});
});