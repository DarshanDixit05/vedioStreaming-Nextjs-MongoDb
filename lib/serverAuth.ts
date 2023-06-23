import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { PrismaClient } from '@prisma/client'

const client = global.prismadb || new PrismaClient()
if (process.env.NODE_ENV === 'production') global.prismadb = client

const serverAuth = async(req : NextApiRequest)=>{
  const session = await getServerSession({req});

  if(!session?.user.?.email)
  {
    throw new Error("Not signed in");
  }

  const currentUser = await client.user.findUnique({
    where:{
      email : session.user.email
    }
  });

  if(!currentUser){
    throw new Error("Not signed in");
  }

  return {currentUser};
}

export default serverAuth;