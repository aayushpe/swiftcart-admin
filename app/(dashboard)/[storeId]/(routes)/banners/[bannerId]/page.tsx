import prismadb from "@/lib/prismadb"
import { BannerForm } from "./components/banner-form"

const BannerPage = async ({
    params
}: {
    params: { bannerId: string}
}) => {
    const banner = await prismadb.banner.findUnique({
        where: {
            id: params.bannerId
        }
    })

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8">
                <BannerForm
                    initialData={banner}
                />
            </div>
        </div>
    )
}

export default BannerPage