import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, Categories: any) => {
        try {
            const data = await Categories.find({}).where('locale').equals(req.query.locale).select('-__v');
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, Categories: any) => {
        try {
            const newCategory = new Categories(req.body);
            newCategory.save();
            return res.status(201).json({
                message: 'Created'
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        res.status(404).json({
            message: "Action not found",
        });
    }
}