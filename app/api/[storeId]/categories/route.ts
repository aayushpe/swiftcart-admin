import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
    { params }: { params: { storeId: string}}
) {
    try {
        const { userId } = auth();

        const body = await req.json()
        const { name, bannerId } = body;
        
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!name) {
            return new NextResponse("Name is required", { status: 401 })
        }

        if(!bannerId) {
            return new NextResponse("A banner is required", { status: 401 })
        }
        
        if(!params.storeId){
            return new NextResponse("Store ID is required", { status: 401 })
        }


        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userID: userId
            }
        })

        if(!storeByUserId) {
            return new NextResponse("Unauthorized" , { status : 403 })
        }

        const category = await prismadb.category.create({
            data: {
                name,
                bannerId,
                storeId: params.storeId
            }
        });

      return NextResponse.json(category)
    } catch (error) {
        console.log('[CATEGROIES_POST]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}

export async function GET(
    req: Request,
    { params }: { params: { storeId: string}}
) {
    try {
        
        if(!params.storeId){
            return new NextResponse("Store ID is required", { status: 401 })
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        });

      return NextResponse.json(categories)
    } catch (error) {
        console.log('[CATEGORIES_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}