import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, Project: any) => {
        try {
            const data = await Project.find({}).where('locale').equals(req.query.locale).select('-__v');
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, Project: any) => {
        try {
            const newItem = new Project(req.body)
            newItem.save();

            res.status(200).json({
                message: 'success'
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    }
}