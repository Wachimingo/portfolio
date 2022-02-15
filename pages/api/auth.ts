import type { NextApiRequest, NextApiResponse } from "next";
import './../../utils/dbConnection';
import User from './../../models/userModel';
const jwt = require('jsonwebtoken');

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST" && req.body.type === 'signin') {
        // const response = await fetch(`${process.env.managementBackend}/api/v1/users/login`, {
        //     method: 'POST',
        //     mode: 'cors',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email: req.body.email,
        //         password: req.body.password
        //     })
        // });
        // const data = await response.json();
        // // console.log("response: ", data)
        // if (response.ok) {
        //     res.status(200).json(data)
        // } else {
        //     res.status(400).json(data)
        // }

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).select('+password');

            if (!user || user.password === undefined || !(await user.correctPassword(password, user.password))) {
                res.status(500).json({
                    error: 'Not found'
                })
            }
            //remove password from output
            user.password = undefined;

            const token = jwt.sign({ id: user._id }, process.env.SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });


            res.status(200).json({
                user,
                token,
            });
        } catch (error) {
            res.status(500).json(error)
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