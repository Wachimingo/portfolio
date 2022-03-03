import { NextApiRequest, NextApiResponse } from "next";
import '../../../utils/dbConnection';
import Skills from "../../../models/skillsModel";
import { actions } from "./actions";

const SkillsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? "default"](req, res, Skills);
}

export default SkillsHandler;