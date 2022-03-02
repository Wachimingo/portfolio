// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import './../../utils/dbConnection';

//Model for MongoDB document
const Brand = require('../../models/brandModel');
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const actions: any = {
        "GET": async () => {
            try {
                const data = await Brand.find({}).select('-__v');

                res.status(200).json(data)

            } catch (error) {
                res.status(500).json({ error })
            }
        },
        "POST": async () => {
            try {
                const newItem = new Brand(req.body);
                newItem.save();
                res.status(201).json({ message: 'success' })
            } catch (error) {
                res.status(500).json({
                    error
                })
            }
        },
        "default": async () => {
            return res.status(500).json({
                message: 'Action not found'
            })
        }
    }
    await actions[req.method ?? "default"]();
}