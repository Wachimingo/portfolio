import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, Locale: any) => {
        try {
            //where locale and pageName = req.query
            const data = await Locale.find({}).where('locale').equals(req.query.locale).where('pageName').equals(req.query.pageName).select('-__v');
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, Locale: any) => {
        try {
            const newContent = new Locale(req.body);
            newContent.save()
            return res.status(201).json({
                message: 'Created'
            });
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