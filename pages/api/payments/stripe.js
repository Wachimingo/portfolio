const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async (req, res) => {
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "usd",
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}