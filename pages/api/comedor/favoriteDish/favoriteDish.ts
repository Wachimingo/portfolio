import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "./actions";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? 'default'](req, res);
}