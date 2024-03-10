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
import ImageUpload from "@/components/image-upload";

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  slug: z.string().min(3),
  imgSrc: z.string().min(1, {
    message: "Image is required",
  }),
});

function CreateCategoryForm() {
  const router = useRouter();
  const { storeId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      imgSrc: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/${storeId}/categories`, {
        data,
      });
      toast.success("Category created successfully");
      router.push(`/${storeId}/categories`);
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
            name="title"
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="Add Slug" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="imgSrc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Image</FormLabel>
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
          Create
        </Button>
      </form>
    </Form>
  );
}

export default CreateCategoryForm;
