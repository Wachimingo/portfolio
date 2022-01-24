import type { NextApiRequest, NextApiResponse } from "next";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    let result: any = undefined;
    // console.log('backend data: ' + req.body)
    // console.log('Metodo: ' + req.method)
    if (req.method === 'POST') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                name: req.body?.name,
                description: req.body?.description,
                price: req.body?.price,
                category: req.body?.category,
                image: req.body?.image
            })
        })
    } else if (req.method === 'GET') {
        if (req.query.type === 'all') {
            result = await fetch(`${process.env.managementBackend}/api/v1/menu?limit=1000`, {
                method: 'GET',
            })
        } else {
            result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.query.id}`, {
                method: 'GET',
            })
        }
    } else if (req.method === 'PATCH' && req.body.type === 'state') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                forToday: req.body.state
            })
        })
    } else if (req.method == 'PATCH' && req.body.type === 'modify') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            },
            body: JSON.stringify({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image
            })
        })
    }
    else if (req.method === 'DELETE') {
        result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: req.headers.authorization ?? 'No token provided'
            }
        })
    }

    const data = await result.json();

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