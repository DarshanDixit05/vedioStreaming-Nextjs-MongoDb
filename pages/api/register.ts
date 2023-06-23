import bcrypt from "bcrypt";
import {NextApiRequest, NextApiResponse} from "next";
import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV === 'production') global.prismadb = client

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if(req.method !== 'POST'){
        return res.status(405).end();
    }
    
    try {
        const existingUser = await client.user.findUnique({
            where:{
                email : req.body.email
            }
        });

        if(existingUser)
        {
            return res.status(422).json({error : 'Email taken'});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const user = await client.user.create({
            data : {
                email : req.body.email,
                name : req.body.name,
                hashedPassword,
                image: '',
                emailVerified: new Date(),
            }
        });

        return res.status(200).json(user);
    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}