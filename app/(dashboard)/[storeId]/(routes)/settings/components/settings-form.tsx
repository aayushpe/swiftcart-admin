"use client"

import { Store } from "@prisma/client"
import toast from "react-hot-toast"
import{ Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { CogIcon, Trash } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { ApiAlert } from "@/components/ui/api-alert"
import { useOrigin } from "@/hooks/use-origin"

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
  })


export const SettingsForm: React.FC<SettingsFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()
    const origin = useOrigin()
    const[open, setOpen] = useState(false)
    const[loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
      })
      
      const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.push(`/${params.storeId}`)
            router.refresh()
            toast.success("Store updated.")
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong.")
        }
      }

      const onDelete = async () => {
        try {
            setLoading(true)
            const storeName = initialData.name 
            await axios.delete(`/api/stores/${params.storeId}`)
            router.push("/")
            router.refresh()
            toast.success(`Store successfully been deleted.`)
        } catch (error) {
            toast.error("Make sure you removed all products and categories first.")
        } finally {
            setLoading(false)
            setOpen(false)
        }
      }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <div className="flex items-center"> {/* Container for CogIcon and Heading */}
                    <CogIcon className=" mr-2" /> {/* Adjust the size as needed */}
                        <Heading
                            title="Settings"
                            description="Manage store preferences"
                        />
                </div>
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                <Trash className="h-4 w-4" />
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name = "name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Store name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert
                title="NEXT_PUBLIC_API_URL"
                description= {`${origin}/api/${params.storeId}`}
                variant= "public"
            />
        </>
    )
}