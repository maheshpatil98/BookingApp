const express = require("express");
const route = express.Router();
const auth = require("../middleware/checkAuth");
const PayDetails = require("../models/Payment");

const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: 'rzp_test_mTep58pZ2brlaL',
    key_secret: 'ZdnP8GzN9nsrWiym4PTzrVux'
})



route.post('/verification', (req, res) => {
    // do a validation
    const secret = '12345678'

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {
        // pass it
    }
    res.json({ status: 'ok' })
})



route.post('/razorpay/:amount', (req, res, next) => {
    const payment_capture = 1
    const amount = req.params.amount;
    const currency = 'INR'

    var options = {
        amount: amount.toString(),
        currency: currency,
        receipt: shortid.generate(),
        payment_capture
    }

    try {
        const response = razorpay.orders.create(options)
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    }
    catch (error) {
        console.log(error);
    }

})

module.exports = route;



/**
 * const response = razorpay.orders.create(options)
        console.log(response)
        const payy = new PayDetails(response);
        payy.save()
            .then((result) => {
                console.log(result);
                res.status(200).json({
                    id: response.id,
                    currency: response.currency,
                    amount: response.amount,
                    message: "Payment Succesfull"
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err,
                });
            });
 */
