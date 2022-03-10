import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": {
        "all": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/menu?limit=1000`, {
                method: 'GET',
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
        "one": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.query.id}`, {
                method: 'GET',
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
        const result = await fetch(`${process.env.managementBackend}/api/v1/menu`, {
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
    "PATCH": {
        "state": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: req.headers.authorization ?? 'No token provided'
                },
                body: JSON.stringify({
                    forToday: req.body.state
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
        "modify": async (req: NextApiRequest, res: NextApiResponse) => {
            const result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
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
    },
    "DELETE": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/menu/${req.body.id}`, {
            method: 'DELETE',
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
            message: 'Action not found'
        })
    }
}