const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
export default async (req, res) => {
    const billDescription = req.body.items.map((dish) => {
        return dish.quantity < 2 ? `${dish.quantity} plato de ${dish.name} a $${dish.price * dish.quantity}` : `${dish.quantity} platos de ${dish.name} a $${dish.price * dish.quantity}`
    })

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.totalPrice * 100,
        currency: "usd",
        description: `Pago a nombre de ${req.body.customer} por ${billDescription.toString()}`,
        // receipt_email: ''
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
}