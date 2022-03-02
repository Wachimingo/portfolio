import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "./actions";
const categories = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? 'default'](req, res)
}

export default categories;