import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, NavBar: any) => {
        try {
            const data = await NavBar.find(req.query).select('-_id -__v');
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({
                msg: 'error'
            })
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, NavBar: any) => {
        try {
            const newItem = new NavBar(req.body);
            newItem.save();
            res.status(201).json({ message: 'success' })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    }
}