import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST" && req.body.type === 'signin') {
        const response = await fetch(`${process.env.managementBackend}/api/v1/users/login`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: req.body.email,
                password: req.body.password
            })
        });
        const data = await response.json();
        // console.log("response: ", data)
        if (response.ok) {
            res.status(200).json(data)
        } else {
            res.status(400).json(data)
        }
    } else if (req.method === "POST" && req.body.type === 'signup') {
        // console.log(req.body)
        const response = await fetch(`${process.env.managementBackend}/api/v1/users/signup`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                role: 'user',
                isActive: false
            })
        });
        const data = await response.json();
        // console.log("response: ", data)
        if (response.ok) {
            res.status(200).json(data)
        } else {
            res.status(400).json(data)
        }
    }
}