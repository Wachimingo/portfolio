import { NextApiRequest, NextApiResponse } from "next";
import '../../../utils/dbConnection';
import Skills from "../../../models/skillsModel";
import { actions } from "./actions";

const SkillsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.wachimingo_api_key) return res.status(404).json({ message: "API key not found" });
    if (req.headers.wachimingo_api_key !== process.env.WACHIMINGO_API_KEY) return res.status(405).json({ message: "Bad request" });

    await actions[req.method ?? "default"](req, res, Skills);
}

export default SkillsHandler;