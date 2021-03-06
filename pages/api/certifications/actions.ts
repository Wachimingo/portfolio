import { NextApiRequest, NextApiResponse } from "next";

export const actions: any = {
    "GET": async (req: NextApiRequest, res: NextApiResponse, Certifications: any) => {
        try {
            const data = await Certifications.find({}).where('locale').equals(req.query.locale).select('-__v');
            return res.status(200).json(data)
        } catch (error) {
            return res.status(500).json({ error })
        }
    },
    "POST": async (req: NextApiRequest, res: NextApiResponse, Certifications: any) => {
        try {
            const newCert = new Certifications(req.body);
            newCert.save();
            return res.status(201).json({
                message: 'Created'
            })
        } catch (error) {
            console.log("TCL: error", error)
            return res.status(500).json({ error })
        }
    },
    "default": async (req: NextApiRequest, res: NextApiResponse) => {
        return res.status(500).json({
            message: 'Action not found'
        })
    }
}