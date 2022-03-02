import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, Skills: any) => {
        try {
            const data = await Skills.find({}).where('locale').equals(req.query.locale).select('-__v');
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, Skills: any) => {
        try {
            const newSkill = new Skills(req.body);
            newSkill.save();
            return res.status(201).json({
                message: 'Created'
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    }
}