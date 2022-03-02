import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const StripeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const actions: any = {
        "POST": async () => {
            const billDescription = req.body.items.map((dish: any) => {
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
        },
        "default": async () => {
            return res.status(500).json({
                message: 'Action not found'
            })
        }
    }
    await actions[req.method ?? 'default']()
}

export default StripeHandler;