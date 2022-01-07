// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import './../../utils/dbConnection';

//Model for MongoDB document
const Brand = require('../../models/brandModel');
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const data = await Brand.find({}).select('-__v');

            res.status(200).json(data)

        } catch (error) {
            res.status(500).json({ error })
        }
    } else if (req.method === 'POST') {
        try {
            const newItem = new Brand(req.body);
            newItem.save();
            res.status(201).json({ message: 'success' })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}