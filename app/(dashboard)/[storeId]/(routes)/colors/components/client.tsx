"use client"

import { ApiList } from "@/components/ui/api-list"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus, Ruler } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ColorColumn, columns } from "./columns"

interface ColorClientProps {
    data: ColorColumn[]
}

export const ColorClient: React.FC<ColorClientProps> = ({
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
                        title={`Colors (${data.length})`}
                        description="Manage colors for your store"
                    />
                </div>
                
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="mr-2 h-4 w-4"/>
                    Add New
                </Button>
            </div>
            
            <Separator/>
            <DataTable searchKey="name" columns={ columns } data={ data }/>
            <Heading
                title={"API"}
                description={"API calls for colors"}
            />
            <Separator/>
            <ApiList
                entityName="colors"
                entityIdName="colorId"
            />
        </>
    )
}


export default ColorClient