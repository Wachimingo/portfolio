import { NextApiRequest, NextApiResponse } from "next";
import '../../../utils/dbConnection';
import Categories from "../../../models/categoriesModel";
import { actions } from "./actions";
const categoriesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? "default"](req, res, Categories);
}

export default categoriesHandler;