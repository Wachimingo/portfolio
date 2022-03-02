import { NextApiRequest, NextApiResponse } from "next";

const opennode = async (req: NextApiRequest, res: NextApiResponse) => {
    const actions: any = {
        "POST": async () => {
            const billDescription = req.body.items.map((dish: any) => {
                return dish.quantity < 2 ? `${dish.quantity} plato de ${dish.name} a $${dish.price * dish.quantity}` : `${dish.quantity} platos de ${dish.name} a $${dish.price * dish.quantity}`
            })

            const result = await fetch('https://dev-api.opennode.com/v1/charges', {
                method: 'POST',
                headers: {
                    // Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: process.env.NEXT_PUBLIC_OPENNODE_API_KEY ?? ''
                },
                body: JSON.stringify({
                    order_id: 'Test',
                    description: `Pago a nombre de ${req.body.customer} por ${billDescription.toString()}`,
                    amount: req.body.totalPrice,
                    notif_email: 'joshuaguillen.adoc@live.com'
                })
            });
            const data = await result.json();
            if (result.ok) {
                res.status(200).json(data)
            } else {
                res.status(401).json({
                    message: data.message
                })
            }
        },
        "default": async () => {
            return res.status(500).json({
                message: 'Action not found'
            })
        }
    }
    await actions[req.method ?? 'default']()
}

export default opennode;