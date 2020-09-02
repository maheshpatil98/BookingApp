const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const flightScheema = require('../api/models/Flight-schema');

const flight = {
    _id: new mongoose.Types.ObjectId(),
    flightSource: "Kashmir",
    flightDestination: "Delhi",
    flightArrival: "11-07-2019 3.00pm",
    flightDeparture: "13-07-2019 1.20am",
    flightId:
        "Kashmir".toUpperCase().slice(0, 3) +
        "Delhi".toUpperCase().slice(0, 3) +
        Date.now(),
    amount: 23000
}

jest.setTimeout(30000);

beforeEach(async () => {
    await flightScheema.deleteMany({});
    await flightScheema(flight).save();
})

const flushPromises = new Promise(resolve => setImmediate(resolve));

test('should post a flight', async () => {
    await flushPromises;
    await request(app).post('/flights/')
        .send({
            flightSource: "Delhi",
            flightDestination: "Manali",
            flightArrival: "10-06-2012 3.00pm",
            flightDeparture: "12-06-2012 2.30pm",
            amount: 23000
        })
        .expect(201)
})

test('should get all flights', async () => {
    await request(app).get('/flights/')
        .expect(200)
})


test('should get a certain flight', async () => {
    await request(app).get('/flights/' + flight.flightId)
        .expect((ress) => {
            ress.flightStatus = 'notArrived',
                ress.flightSource = 'Kashmir',
                ress.flightDestination = 'Delhi',
                ress.flightArrival = '11-07-2019 3.00pm',
                ress.flightDeparture = '13-07-2019 1.20am',
                ress.flightId = 'KASDEL1599051573961',
                ress.amount = 23000
        })    //.toBe({ flightId: flight.flightId })
})

test('should update a certain flight', async () => {
    await request(app).patch('/flights/' + flight.flightId)
        .send([{
            propName: "amount",
            value: 33000
        }])
        .expect((res) => {
            res.amount = 33000
        })
})


test('should delete a certain flight', async () => {
    await request(app).delete('/flights/' + flight.flightId)
        .expect((res) => {
            res.message = "deleted"
        })
})

test('should search a certain flight with source and destination',
    async () => {
        await request(app).get('/flights/kashmir/delhi')
            .expect((res) => {
                res.flightId = flight.flightId
            })
    })

