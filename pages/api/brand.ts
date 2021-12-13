// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const mongoose = require('mongoose')

//Model for MongoDB document
const Brand = require('../../models/brandModel');
export default async (req: NextApiRequest, res: NextApiResponse) => {
    //Connection to MongoDB
    const dev_db_url = 'mongodb://localhost:27017/portfolio'
    // mongoose.connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true }):
    mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise
    const db = mongoose.connection;
    // db.on('error', console.error.bind(console, 'MongoDB connection error: '));
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