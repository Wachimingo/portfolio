import { NextApiRequest, NextApiResponse } from "next";

const Orders = async (req: NextApiRequest, res: NextApiResponse) => {

    let result = undefined;
    if (req.method === "PATCH") {
        result = await fetch(`${process.env.managementBackend}/api/v1/bills/${req.query.orderId}`,
            {
                method: 'PATCH',
                mode: 'cors',
                headers: {
                    Authorization: req.headers.authorization ?? '',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    status: req.body.status,
                }),
            }
        );
    }

    const data = await result?.json();
    if (result?.ok) {
        res.status(200).json({
            "message": "Document updated"
        })
    } else {
        res.status(400).json({
            "message": "error",
        })
    }
}

export default Orders;
