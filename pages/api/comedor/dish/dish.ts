import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "./actions";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    req.body.type ?
        await actions[req.method ?? 'default'][req.body.type ?? 'default'](req, res)
        :
        await actions[req.method ?? 'default'](req, res)
}