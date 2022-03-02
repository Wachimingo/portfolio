import { NextApiRequest, NextApiResponse } from "next";
export const actions: any = {
    "GET": {
        "one": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/reviews/user/${req.query.userId}/${req.query.dishId}`, {
                method: 'GET',
                headers: {
                    Authorization: req.headers.authorization ?? 'No token provided'
                }
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
        "all": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/reviews/`, {
                method: 'GET',
                headers: {
                    Authorization: req.headers.authorization ?? 'No token provided'
                }
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
                message: 'Type not found'
            })
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.dish}/reviews`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                // dish: req.body.itemId,
                review: req.body.review,
                rating: req.body.rating,
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
    "PATCH": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/reviews/${req.body.reviewId}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                // dish: req.body.itemId,
                review: req.body.review,
                rating: req.body.rating,
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
    "DELETE": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/reviews/${req.body.reviewId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            }
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