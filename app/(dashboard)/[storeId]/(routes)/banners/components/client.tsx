"use client"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { GalleryVertical, Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { BannerColumn, columns } from "./columns"

interface BannerClientProps {
    data: BannerColumn[]
}

export const BannerClient: React.FC<BannerClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between"> {/* Container for CogIcon, Heading, and Badge */}
                <div className="flex items-center"> {/* Container for Badge and Heading */}
                    <GalleryVertical className="mr-2" /> {/* Adjust the size as needed */}
                    <Heading
                        title={`Banners (${data.length})`}
                        description="Manage banners for your store"
                    />
                </div>
                
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            
            <Separator/>
            <DataTable searchKey="label" columns={ columns } data={ data }/>
            <Heading
                title={"API"}
                description={"API calls for banners"}
            />
            <Separator/>
            <ApiList
                entityName="banners"
                entityIdName="bannerId"
            />
        </>
    )
}


export default BannerClient