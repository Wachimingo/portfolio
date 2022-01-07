import type { NextApiRequest, NextApiResponse } from 'next'
import './../../utils/dbConnection';

//Model for MongoDB document
const NavBar = require('../../models/navbarModel');
export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const data = await NavBar.find({}).select('-_id -__v');

            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error })
        }
    } else if (req.method === 'POST') {
        try {
            const newItem = new NavBar(req.body);
            newItem.save();
            res.status(201).json({ message: 'success' })
        } catch (error) {
            res.status(500).json({
                error
            })
        }
    }
}

