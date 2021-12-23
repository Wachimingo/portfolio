import NextAuth from "next-auth";
import EmailProvider from 'next-auth/providers/email';
import FacebookProvider from "next-auth/providers/facebook";
const mongoose = require('mongoose')
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "./../../../lib/mongodb"
const jwt = require('jsonwebtoken');

//Model for MongoDB document
const User = require('./../../../models/userModel');

const handleCallback = (user, profile, token, type) => {
    switch (type) {
        case 'facebook':
            return `/auth/success?id=${user._id}&externalId=${profile.id}&name=${profile.name}&email=${profile.email}&picture=${profile.picture.data.url}&role=user&token=${token}`;
            break;
        case 'email':
            return `/auth/success?id=${user._id}&name=${user.name}&email=${user.email}&role=${user.role}&token=${token}`;
            break;
    }

}

export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    pages: {
        signIn: '/',
    },
    providers: [
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM,
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        })
        // ...add more providers here
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (profile) {

                //Connection to MongoDB
                const dev_db_url = 'mongodb://localhost:27017/portfolio'
                // mongoose.connect(process.env.MONGODB_URI || dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true }):
                mongoose.connect(dev_db_url, { useNewUrlParser: true, useUnifiedTopology: true });
                mongoose.Promise = global.Promise
                const db = mongoose.connection;
                //Check if user exists
                const userExists = await User.findOne({ externalId: profile.id, email: profile.email });
                if (!userExists) {
                    //Create new user
                    const newUser = await User.create({
                        name: profile.name,
                        externalId: profile.id,
                        email: profile.email,
                        role: 'user',
                        photo: profile.picture.data.url
                    })
                    const id = newUser._id;
                    const token = jwt.sign({ id }, process.env.SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    return handleCallback(newUser, profile, token, 'facebook');
                } else {
                    const id = userExists._id
                    const token = jwt.sign({ id }, process.env.SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    return handleCallback(userExists, profile, token, 'facebook');
                }
            } else if (email) {
                // *TODO: Check if email has already been used
                if (email.email !== undefined) {
                    const userExists = await User.findOne({ email: email.email });
                    const id = userExists._id
                    const token = jwt.sign({ id }, process.env.SECRET, {
                        expiresIn: process.env.JWT_EXPIRES_IN,
                    });
                    const updatedUser = await User.findOneAndUpdate({ email: email.email }, { isValidated: true });
                    console.log(updatedUser)
                    return handleCallback(updatedUser, null, token, 'email');
                }
                //The first call back it does only returns an object to confirm the email requests = true
                else {
                    return true;
                }
            }
        }
    },
})