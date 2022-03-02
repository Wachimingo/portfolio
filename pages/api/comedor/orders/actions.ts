import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    },
    "PATCH": async (req: NextApiRequest, res: NextApiResponse) => {
        const result = await fetch(`${process.env.managementBackend}/api/v1/bills/${req.query.orderId}`,
            {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    Authorization: req.headers.authorization ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: req.body.status,
                }),
            }
        );
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