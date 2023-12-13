"use client"

import { useStoreModal } from "@/hooks/use-store-modal"
import { Modal } from "@/components/ui/modal"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"


import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"


const formSchema = z.object({
  username: z.string().min(2).max(50),
})


export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
          setLoading(true)

          const response = await axios.post('/api/stores', values)
          toast.success("Store Created!")
          window.location.assign(`/${response.data.id}`)

        } catch (error){
          toast.error("Something went wrong")

        } finally {
          setLoading(false)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
    
    return (
        <Modal
          title="Create Store"
          description="Add a new store to manage products and categories"
          isOpen={storeModal.isOpen}
          onClose={storeModal.onClose}
        >
          <div>
            <div className="space-y-4 py-2 pb-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            disabled={loading}
                            placeholder="E-Commerce" 
                            {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public store name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                    <Button
                      disabled={loading} 
                      variant="outline">Cancel
                    </Button>
                    <Button 
                      disabled={loading}
                      type="submit">Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </Modal>
      );
      
}