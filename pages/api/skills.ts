import { NextApiRequest, NextApiResponse } from "next";
import './../../utils/dbConnection';
import Skills from "../../models/skillsModel";

const SkillsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const actions: any = {
        "GET": async () => {
            try {
                const data = await Skills.find({}).where('locale').equals(req.query.locale).select('-__v');
                res.status(200).json(data)
            } catch (error) {
                res.status(500).json(error)
            }
        },
        "POST": async () => {
            try {
                const newSkill = new Skills(req.body);
                newSkill.save();
                return res.status(200).json({
                    message: 'success'
                })
            } catch (error) {
                res.status(500).json({
                    message: 'error'
                })
            }
        },
        "default": async () => {
            res.status(500).json({
                message: 'Action not found'
            })
        }
    }
    await actions[req.method ?? "default"]();
}


export default SkillsHandler;