import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnection";
import User from '../../../models/userModel';
import { actions } from "./actions";

const Auth = async (req: NextApiRequest, res: NextApiResponse) => {
    const { type } = req.body;
    await dbConnect();
    await actions[req.method ?? "default"][type ?? 'default'](req, res, User);
}

export default Auth;