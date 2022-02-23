import type { NextApiRequest, NextApiResponse } from "next";
const bills = async (req: NextApiRequest, res: NextApiResponse) => {
    let result = undefined;
    if (req.method === 'POST') {
        result = await fetch(`${process.env.managementBackend}/api/v1/bills`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                user: req.body.userId,
                customer: req.body.customer ?? req.body.userId,
                totalDishes: req.body.totalDishes,
                totalPrice: req.body.totalPrice,
                status: req.body.status,
                paymentIntent: req.body.paymentIntent,
                isPaid: req.body.isPaid,
                body: req.body.body,
            })
        })
    }
    const data = await result?.json();
    if (result?.ok) {
        res.status(200).json({
            data
        })
    } else {
        res.status(401).json({
            error: data.error.message
        })
    }
}

export default bills;