import type { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    let result = {};
    // console.log(req.headers.authorization)
    if (req.method === 'POST') {
        // console.log(req.body)
        result = await fetch(`${process.env.managementBackend}/api/v1/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization
            },
            body: JSON.stringify(req.body)
        })
    } else if (req.method === 'GET') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu?limit=1000`, {
            method: 'GET',
        })
    }

    const data = await result.json();

    // console.log(data)

    if (result.ok) {
        res.status(200).json(data);
    } else {
        res.status(data.error.statusCode).json({
            message: data.message
        });
    }
}