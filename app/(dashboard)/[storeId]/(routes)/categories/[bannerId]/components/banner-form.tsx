"use client"

import { Banner } from "@prisma/client"
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
import { useOrigin } from "@/hooks/use-origin"
import ImageUpload from "@/components/ui/image-upload"

interface BannerFormProps {
    initialData: Banner | null
}

const formSchema = z.object({
    label: z.string().min(2).max(50),
    imageUrl: z.string().min(2)
  })


export const BannerForm: React.FC<BannerFormProps> = ({
    initialData
}) => {
    const params = useParams()
    const router = useRouter()

    const[open, setOpen] = useState(false)
    const[loading, setLoading] = useState(false)

    const title = initialData ? "Edit banner" : "Create banner"
    const description = initialData ? "Edit a banner" : "Add a new banner"
    const toastMessage = initialData ? "Banner updated." : "Banner created."
    const action = initialData ? "Save Changes" : "Create"


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: ''
        }
      })
      
      const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try{
            setLoading(true)
            if (initialData){
                await axios.patch(`/api/${params.storeId}/banners/${params.bannerId}`, data)
            } else {
                await axios.post(`/api/${params.storeId}/banners`, data)
            }

            router.push(`/${params.storeId}/banners`)
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
            await axios.delete(`/api/${params.storeId}/banners/${params.bannerId}`);
            router.push(`/${params.storeId}/banners`)
            router.refresh()
            toast.success(`Banner deleted.`)
        } catch (error) {
            toast.error("Make sure you removed all categories using this billboard first.")
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
                    <FormField
                        control={form.control}
                        name = "imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Background image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        value={field.value ? [field.value] : []}
                                        disabled={loading}
                                        onChange={(url) => field.onChange(url)}
                                        onRemove={() => field.onChange("")}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name = "label"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Label</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Banner label" {...field}/>
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