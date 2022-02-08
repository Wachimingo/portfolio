const stripe = require('stripe');
const getRawBody = require('raw-body');
import './../../../../utils/dbConnection';

//Model for MongoDB document
const Bill = require('../../../../models/billModel');

export const config = {
    api: {
        bodyParser: false,
    },
}
const StripeHook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = 'whsec_38a8ead9c2405eeb883e42e2065f84b157813cd2e1e8d745d67564860c68c504'
    let event = null;

    const rawBody = await getRawBody(req);

    try {
        event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } catch (err) {
        // invalid signature
        console.log("TCL: webhook", err)
        res.status(400).end();
        return;
    }

    let intent = null;
    switch (event['type']) {
        case 'payment_intent.succeeded':
            intent = event.data.object;
            const updateBillIsPaid = await fetch(`${process.env.managementBackend}/api/v1/payment/update/billIsPaid`, {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentIntent: intent.id,
                    isPaid: true
                })
            });
            const updateRes = await updateBillIsPaid.json()
            if (updateBillIsPaid.ok) {

                console.log("TCL: StripeHook -> success", updateRes)
            } else {

                console.log("TCL: StripeHook -> fail", updateRes)
            }
            res.status(200);
            break;
        case 'payment_intent.payment_failed':
            intent = event.data.object;
            const message = intent.last_payment_error && intent.last_payment_error.message;
            console.log('Failed:', intent.id, message);
            break;
    }
    res.status(200);
}

export default StripeHook;