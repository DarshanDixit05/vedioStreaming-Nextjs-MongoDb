import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useCallback } from "react";

const images = [
    '/images/blue.jpeg',
    '/images/red.jpeg',
    '/images/yellow.jpeg',
    '/images/green.png'
]
export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth',
          permanent: false,
        }
      }
    }
  
    return {
      props: {}
    }
}

const UserCard : React.FC<UserCardProps> = ({name}) =>{
    const imgSrc = images[Math.floor(Math.random()*4)];

    return (
        <div className="group flex-row w-44 mx-auto">
            <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden">
            <img draggable={false} className="w-max h-max object-contain" src={imgSrc} alt="" />
            </div>
            <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white">{name}</div>
        </div>
    );
}
const MyPage = () =>{
    return(
        <h1 className="text-green-200">Helloo new page!!</h1>
    )
}

export default MyPage;