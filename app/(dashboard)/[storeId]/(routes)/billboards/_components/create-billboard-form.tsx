"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/image-upload";
import Spinner from "@/components/spinner";

const formSchema = z.object({
  label: z.string().min(4, {
    message: "Label must be at least 1 characters.",
  }),
  imageUrl: z.string().min(1),
});

function CreateBillboardForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { storeId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: "",
      imageUrl: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await axios.post(`/api/${storeId}/billboards`, {
        data,
      });
      setLoading(false);
      toast.success("Billboard created successfully");
      router.push(`/${storeId}/billboards`);
    } catch (error) {
      if (error instanceof AxiosError) {
        setLoading(false);
        toast.error(error.response?.data);
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-7 overflow-x-auto w-full">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Billboard Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="mt-3">
          {loading ? <Spinner /> : "Create"}
        </Button>
      </form>
    </Form>
  );
}

export default CreateBillboardForm;
