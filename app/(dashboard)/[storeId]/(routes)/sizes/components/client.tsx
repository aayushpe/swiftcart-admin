"use client"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus, Ruler } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "./columns"

interface SizeClientProps {
    data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({
    data
}) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between"> {/* Container for CogIcon, Heading, and Badge */}
                <div className="flex items-center"> {/* Container for Badge and Heading */}
                    <Ruler className="mr-2" /> {/* Adjust the size as needed */}
                    <Heading
                        title={`Sizes (${data.length})`}
                        description="Manage sizes for your store"
                    />
                </div>
                
                <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            
            <Separator/>
            <DataTable searchKey="name" columns={ columns } data={ data }/>
            <Heading
                title={"API"}
                description={"API calls for sizes"}
            />
            <Separator/>
            <ApiList
                entityName="sizes"
                entityIdName="sizeId"
            />
        </>
    )
}


export default SizeClient