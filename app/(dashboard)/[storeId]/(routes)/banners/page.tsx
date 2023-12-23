import prismadb from "@/lib/prismadb"
import BannerClient from "./components/client"

const BannersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    const banners = await prismadb.banner.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <BannerClient data={ banners }/>
            </div>
        </div>
    )
}
export default BannersPage