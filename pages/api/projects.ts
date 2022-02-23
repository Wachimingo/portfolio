import { NextApiRequest, NextApiResponse } from "next";
import './../../utils/dbConnection';
import Project from './../../models/projectModel';

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const data = await Project.find({}).where('locale').equals(req.query.locale).select('-__v');
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    if (req.method === 'POST') {
        try {
            const newItem = new Project(req.body)
            newItem.save();

            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

}

export default Projects;