import type { NextApiRequest, NextApiResponse } from "next";
const categories = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body)
    let result: any = undefined;
    if (req.method === 'POST') {
        result = await fetch(`${process.env.managementBackend}/api/v1/categories/`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                dish: req.body.dishId,
                user: req.body.userId,
            })
        })
    } else if (req.method === 'DELETE') {
        result = await fetch(`${process.env.managementBackend}/api/v1/categories/${req.body.id}`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                dish: req.body.dishId,
                user: req.body.userId,
            })
        })
    } else if (req.method === 'GET') {
        result = await fetch(`${process.env.managementBackend}/api/v1/categories/`, {
            method: 'GET',
            headers: {
                Authorization: req.headers.authorization ?? 'No token provided'
            }
        })
    }

    const data = await result?.json();
    // console.log(data)
    if (result?.ok) {
        if (data.msg) {
            res.status(400).json({
                record: null,
                records: null
            })
        } else {
            res.status(200).json(data)
        }
    } else {
        // console.log(data)
        res.status(400).json({
            message: data.error.message,
            record: null,
            records: null,
        });
    }
}

export default categories;