import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { exit } from "process";

export default async function SetupLayout ({
    children
}: {
    children: React.ReactNode;
}) {
    const { userId } = auth()

    let store = null

    if (!userId) {
        redirect('/landing')
        
    } else{
        store = await prismadb.store.findFirst({
            where: {
                userID: userId
            }
        })
    }

    if(store) {
        redirect(`/${store.id}`)
    }

    return (
        <>
            {children}       
        </>
    )
}