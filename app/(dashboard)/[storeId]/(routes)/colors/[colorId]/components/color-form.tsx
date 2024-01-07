"use client"

import { Color } from "@prisma/client"
import toast from "react-hot-toast"
import{ Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import {  GalleryVertical, Trash } from "lucide-react"
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

interface ColorFormProps {
    initialData: Color | null
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
    value: z.string().min(4).regex(/^#/, {
        message: 'String must be a valid hex code'
    })
  })


export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()

    const[open, setOpen] = useState(false)
    const[loading, setLoading] = useState(false)

    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? "Edit color" : "Add a new color"
    const toastMessage = initialData ? "Color updated." : "Color added."
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
      })
      
      const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            if (initialData){
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data)
            }

            router.push(`/${params.storeId}/colors`)
            router.refresh()
            toast.success(toastMessage)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error("Something went wrong.")
        }
      }

      const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
            router.push(`/${params.storeId}/colors`)
            router.refresh()
            toast.success(`Color deleted.`)
        } catch (error) {
            toast.error("Make sure you removed all products using this size first.")
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
                    <GalleryVertical className=" mr-2" /> {/* Adjust the size as needed */}
                        <Heading
                            title= {title}
                            description= {description}
                        />
                </div>
                {initialData && (
                <Button
                    disabled={loading}
                    variant="destructive"
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                <Trash className="h-4 w-4" />
                </Button>
                )}
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
                                        <Input disabled={loading} placeholder="Color name" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name = "value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Color Hex Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Value" {...field}/>
                                            <div className="border p-4 rounded-full" style={{backgroundColor:field.value}}>
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
            <Separator/>
        </>
    )
}