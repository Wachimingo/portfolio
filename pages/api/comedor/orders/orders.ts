import { NextApiRequest, NextApiResponse } from "next";
import { actions } from "./actions";
const Orders = async (req: NextApiRequest, res: NextApiResponse) => {
    await actions[req.method ?? 'default'](req, res)
}
export default Orders;
