"use client";

import React from "react";
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
import { Billboard } from "@prisma/client";
import ImageUpload from "@/components/image-upload";

const formSchema = z.object({
  label: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  imageUrl: z.string().min(1),
});

function UpdateBillboardForm({ billboard }: { billboard: Billboard }) {
  const router = useRouter();
  const { storeId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: billboard.label,
      imageUrl: billboard.imageUrl,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/${storeId}/billboards/${billboard?.id}`, {
        data,
      });
      toast.success("Billboard updated successfully");
      router.push(`/${storeId}/billboards`);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data);
      }
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="">
        <div className="grid grid-cols-2 gap-7">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Add label" {...field} />
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
          Update
        </Button>
      </form>
    </Form>
  );
}

export default UpdateBillboardForm;
