import { NextPageContext } from "next";
import {signOut, getSession} from "next-auth/react";

export async function getServerSideProps(context:NextPageContext) {
  const session = await getSession(context);

  if(!session)
  {
    return {
      redirect:{
        destination:'/auth',
        permanent : false
      }
    }
  }
  
  return {
    props:{}
  }
}
export default function Home() {
  return (
    <>
    <h1 className="text-green-200">home</h1>
    <button className ="h-10 w-full bg-white" onClick={()=>signOut()}>Log out</button>
    </>
  )
}