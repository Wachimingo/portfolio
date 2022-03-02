import type { NextApiRequest, NextApiResponse } from "next";
import { actions } from "../../locale/actions";
const bills = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? 'default'](req, res)
}

export default bills;