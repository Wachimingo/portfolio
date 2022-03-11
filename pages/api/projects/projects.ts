import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnection";
import Project from '../../../models/projectModel';
import { actions } from "./actions";

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.headers.wachimingo_api_key) return res.status(404).json({ message: "API key not found" });
    if (req.headers.wachimingo_api_key !== process.env.WACHIMINGO_API_KEY) return res.status(405).json({ message: "Bad request" });
    await dbConnect();
    await actions[req.method ?? "default"](req, res, Project);
}

export default Projects;