import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "./actions";
const review = async (req: NextApiRequest, res: NextApiResponse) => {
    const type = req.query.type;
    await actions[req.method ?? "default"][type[0] ?? 'default'](req, res);
}

export default review;