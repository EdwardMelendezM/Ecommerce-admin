'use client'

import { useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { toast } from 'react-hot-toast'
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod"
import { useStoreModal } from "@/hooks/use-store-modal";

import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


// Estructura necesaria para el form con zod
const formSchema = z.object({
  name:z.string().min(1),
})

const StoreModal = () => {

  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);


  const form = useForm < z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues:{
      name:''
    }
  })

  const onSubmit= async(values:z.infer<typeof formSchema>)=>{
    try {
      setIsLoading(true)
      const response = await axios.post('/api/stores',values)
      toast.success('Success')
      window.location.assign(`/${response.data.id}`)

    } catch (error) {
      toast.error('Something went wrong')

    } finally{
      setIsLoading(false)
    }
  }

  return ( 
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({field})=>(
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        placeholder="E-commerce"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  type="button"
                  disabled={isLoading}
                  variant={'outline'}
                  onClick={storeModal.onClose}
                >
                  Cancel
                </Button>
                <Button
                  disabled={isLoading}
                  type="submit"
                >
                  Continue
                </Button>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </Modal>
   );
}
 
export default StoreModal;