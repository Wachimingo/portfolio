import { NextApiRequest, NextApiResponse } from "next";
import './../../utils/dbConnection';
import Locale from "../../models/localeModel";

const localeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const actions: any = {
        "GET": async () => {
            try {
                //where locale and pageName = req.query
                const data = await Locale.find({}).where('locale').equals(req.query.locale).where('pageName').equals(req.query.pageName).select('-__v');
                return res.status(200).json(data)
            } catch (error) {
                return res.status(500).json(error)
            }
        },
        "POST": async () => {
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
        "default": async () => {
            return res.status(500).json({
                message: 'Action not found'
            })
        }
    }

    await actions[req.method ?? "default"]();
}

export default localeHandler;