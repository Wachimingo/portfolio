import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/categories/`, {
            method: 'GET',
            headers: {
                Authorization: req.headers.authorization ?? 'No token provided'
            }
        });
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
    "POST": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/categories/`, {
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
        const result = await fetch(`${process.env.managementBackend}/api/v1/categories/${req.body.id}`, {
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
        });
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