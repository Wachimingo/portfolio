import type { NextApiRequest, NextApiResponse } from "next";
const review = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body)
    let result: any = undefined;
    if (req.method === 'POST') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.dish}/reviews`, {
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
    } else if (req.method === 'DELETE') {
        result = await fetch(`${process.env.managementBackend}/api/v1/reviews/${req.body.reviewId}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            }
        })
    } else if (req.method === 'PATCH') {
        result = await fetch(`${process.env.managementBackend}/api/v1/reviews/${req.body.reviewId}`, {
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
    }
    else if (req.method === 'GET') {
        if (req.query.type === 'one') {
            result = await fetch(`${process.env.managementBackend}/api/v1/reviews/user/${req.query.userId}/${req.query.dishId}`, {
                method: 'GET',
                headers: {
                    Authorization: req.headers.authorization ?? 'No token provided'
                }
            })
        } else {
            result = await fetch(`${process.env.managementBackend}/api/v1/reviews/`, {
                method: 'GET',
                headers: {
                    Authorization: req.headers.authorization ?? 'No token provided'
                }
            })
        }
    }

    const data = await result?.json();
    // console.log(data)
    if (result?.ok) {
        res.status(200).json({
            record: data
        })
    } else {
        // console.log(data)
        res.status(400).json({
            message: data.error.message ?? data.message,
            record: null,
            records: null,
        });
    }
}

export default review;