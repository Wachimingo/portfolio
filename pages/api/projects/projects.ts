import { NextApiRequest, NextApiResponse } from "next";
import '../../../utils/dbConnection';
import Project from '../../../models/projectModel';
import { actions } from "./actions";

const Projects = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? "default"](req, res, Project);
}

export default Projects;