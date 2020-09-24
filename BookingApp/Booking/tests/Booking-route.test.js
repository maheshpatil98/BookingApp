const app = require('../app');
const request = require('supertest');
const booking = require('../api/models/Passenger-schema');
const mongoose = require('mongoose');


const passenger = {
    _id: mongoose.Types.ObjectId(),
    firstname: "Mohan",
    lastname: "pal",
    number: "9565623154",
    email: "mohan@mail.com",
    password: "password",
    Nationality: "Indian",
    status: "Arrived",
    useridentification: "mohpal39",
    amount: 22000,
    flightID: "KASDEL1599056831008",
    bookId: "MOHKASDEL159905683100845"
}

const flushPromises = new Promise(resolve => setImmediate(resolve));

jest.setTimeout(30000);

beforeEach(async () => {
    await flushPromises;
    await booking.deleteMany({});
    await booking(passenger).save();
})




test('should sucesfully post a Passenger details in the database function', async () => {
    await request(app).post('/bookings/add/KASDEL1599056831008/23000')
        .send({
            firstname: "Anjan",
            lastname: "pela",
            number: "9565643154",
            email: "anjan@mail.com",
            password: "password",
            Nationality: "Indian",
            status: "CONFIRMED"
        })
        .expect((ressp) => {
            ressp.firstname = "Anjan",
                ressp.email = "anjan@mail.com"
        })
})

test('should sucesfully post a Passenger details in the database function', async () => {
    await request(app).post('/bookings/add/KASDEL1599056831008/23000')
        .send({
            firstname: "anuj",
            lastname: "pela",
            number: "8956451265",
            password: "password",
            Nationality: "Indian",
            status: "CONFIRMED"
        })
        .expect(500);
})




test('giving correct input for testing', async () => {
    await request(app).get("/bookings/")
        .expect((resp) => {
            resp.length = 2
        })
})







test('should return a passeger with given id', async () => {
    await request(app).get("/bookings/mohpal39")
        .expect((resp) => {
            resp.email = passenger.email;
            resp.flightID = passenger.flightID;
        })
})

test('should return a passeger with given id', async () => {
    await request(app).get("/bookings/mo39")
        .expect(500)
})


test('should update a passeger with given id', async () => {
    await request(app).patch("/bookings/MOHKASDEL159905683100845")
        .send([{
            propName: "email",
            value: "mynewmail@mail.com"
        }])
        .expect((resp) => {
            resp.email = "mynewmail@mail.com"
        })
})

test('should delete a certain id', async () => {
    await request(app).delete("/bookings/mohpal39")
        .expect((ress) => {
            ress.count = 1
        })
})

test('should delete a user', async () => {
    await request(app).delete("/bookings/book/mohpal39")
        .expect((ress) => {
            ress.count = 1
        })
})

test('should login the user', async () => {
    await request(app).post("/bookings/login")
        .send({
            email: "mohan@mail.com",
            password: "password"
        })
        .expect((ress) => {
            ress.id = "mohpal39"
            ress.message = "Auth Succesful"
        })
})

test('should return all the flights with certain id', async () => {

    await request(app).get("/bookings/get/status/mohpal39")
        .expect((ress => {
            ress.length = 1
        }))
})

test('should delete whole passengers of certain flight', async () => {
    await request(app).delete("/bookings/flight/passengers/KASDEL1599056831008")
        .expect((ress) => {
            ress.message = "deleted"
        })
})
