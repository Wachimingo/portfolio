import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/bills`, {
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
        const data = await result?.json();
        if (result?.ok) {
            return res.status(200).json({
                data
            })
        } else {
            return res.status(401).json({
                error: data.error.message
            })
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    }
}