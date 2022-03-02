import { NextApiRequest, NextApiResponse } from "next";
import '../../../utils/dbConnection';
import Locale from "../../../models/localeModel";
import { actions } from "./actions";

const localeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? "default"]();
}

export default localeHandler;