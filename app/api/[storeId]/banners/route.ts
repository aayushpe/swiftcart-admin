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
        const { label, imageUrl } = body;
        
        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if(!label) {
            return new NextResponse("Label is required", { status: 401 })
        }

        if(!imageUrl) {
            return new NextResponse("Image URL is required", { status: 401 })
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

        const banner = await prismadb.banner.create({
            data: {
                label,
                imageUrl,
                storeId: params.storeId
            }
        });

      return NextResponse.json(banner)
    } catch (error) {
        console.log('[BANNERS_POST]', error)
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

        const banners = await prismadb.banner.findMany({
            where: {
                storeId: params.storeId
            }
        });

      return NextResponse.json(banners)
    } catch (error) {
        console.log('[BANNERS_GET]', error)
        return new NextResponse("Internal error", { status: 500 })
    }
}