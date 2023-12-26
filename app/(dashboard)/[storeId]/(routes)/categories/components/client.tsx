"use client"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { AlignLeft, GalleryVertical, Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between"> {/* Container for CogIcon, Heading, and Badge */}
                <div className="flex items-center"> {/* Container for Badge and Heading */}
                    <AlignLeft className="mr-2" /> {/* Adjust the size as needed */}
                    <Heading
                        title={`Categories (${data.length})`}
                        description="Manage categories for your store"
                    />
                </div>
                
                <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            
            <Separator/>
            <DataTable searchKey="name" columns={ columns } data={ data }/>
            <Heading
                title={"API"}
                description={"API calls for categories"}
            />
            <Separator/>
            <ApiList
                entityName="categories"
                entityIdName="categoryId"
            />
        </>
    )
}


export default CategoryClient