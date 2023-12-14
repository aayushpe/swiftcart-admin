"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { GalleryVertical, Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

export const BannerClient = () => {
    const router = useRouter()
    const params = useParams()
    return (
        <>
            <div className="flex items-center justify-between"> {/* Container for CogIcon, Heading, and Badge */}
                <div className="flex items-center"> {/* Container for Badge and Heading */}
                    <GalleryVertical className="mr-2" /> {/* Adjust the size as needed */}
                    <Heading
                        title="Banners"
                        description="Manage banners for your store"
                    />
                </div>
                
                <Button onClick={() => router.push(`/${params.storeId}/banners/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            
            <Separator/>
        </>
    )
}


export default BannerClient