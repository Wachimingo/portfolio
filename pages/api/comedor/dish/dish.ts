import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "../../locale/actions";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { type } = req.query;
    await actions[req.method ?? 'default'][type[0] ?? 'default'](req, res);
}