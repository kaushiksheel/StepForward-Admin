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
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "@/components/image-upload";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { Checkbox } from "@/components/ui/checkbox";
import { Category, Colour, Feature, Material, Size } from "@prisma/client";

const formSchema = z.object({
  name: z.string().min(4),
  slug: z.string().min(3),
  price: z.coerce.number().min(1),
  description: z.string().min(10),
  image: z.string().url(),
  categoryId: z.string().min(7),
  thumbnails: z.object({ imageUrl: z.string() }).array(),
  isFeatured: z.boolean(),
  isInStock: z.boolean(),
  featureId: z.string().min(3),
  sizeId: z.string().min(1),
  colorId: z.string().min(3),
  materialId: z.string().min(3),
});

interface CreateProductFormProps {
  categories: Category[];
  features: Feature[];
  sizes: Size[];
  colours: Colour[];
  materials: Material[];
}

function CreateProductForm({
  categories,
  features,
  sizes,
  colours,
  materials,
}: CreateProductFormProps) {
  const router = useRouter();
  const { storeId } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: 0,
      description: "",
      image: "",
      categoryId: "",
      thumbnails: [],
      isFeatured: false,
      isInStock: false,
      featureId: "",
      sizeId: "",
      colorId: "",
      materialId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
    try {
      await axios.post(`/api/${storeId}/products`, { data });

      toast.success("Product created");
      router.push(`/${storeId}/products`);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Add Name" {...field} />
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Add price"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="write a description for your product"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
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
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Catgory</FormLabel>
                <FormControl>
                  <SelectDropdown
                    getSelectedValue={(value) => field.onChange(value)}
                    placeholder="Select category"
                    label="Category"
                    options={
                      categories
                        ? categories.map(({ title, id }) => ({
                            value: id,
                            label: title,
                          }))
                        : []
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isFeatured"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel>Featured</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isInStock"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-4">
                <FormLabel>InStock</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="featureId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Feature</FormLabel>
                <FormControl>
                  <SelectDropdown
                    getSelectedValue={(value) => field.onChange(value)}
                    placeholder="Select Feature"
                    label="Feature"
                    options={
                      features
                        ? features.map(({ title, id }) => ({
                            value: id,
                            label: title,
                          }))
                        : []
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sizeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Size</FormLabel>
                <FormControl>
                  <SelectDropdown
                    getSelectedValue={(value) => field.onChange(value)}
                    placeholder="Select category"
                    label="Category"
                    options={
                      sizes
                        ? sizes.map(({ title, id }) => ({
                            value: id,
                            label: title,
                          }))
                        : []
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="colorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Colour</FormLabel>
                <FormControl>
                  <SelectDropdown
                    getSelectedValue={(value) => field.onChange(value)}
                    placeholder="Select colour"
                    label="colour"
                    options={
                      colours
                        ? colours.map(({ title, id }) => ({
                            value: id,
                            label: title,
                          }))
                        : []
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="materialId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Material</FormLabel>
                <FormControl>
                  <SelectDropdown
                    getSelectedValue={(value) => field.onChange(value)}
                    placeholder="Select material"
                    label="material"
                    options={
                      materials
                        ? materials.map(({ title, id }) => ({
                            value: id,
                            label: title,
                          }))
                        : []
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnails"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.imageUrl)}
                    onChange={(imageUrl) =>
                      field.onChange([...field.value, { imageUrl }])
                    }
                    onRemove={(imageUrl) =>
                      field.onChange([
                        ...field.value.filter(
                          (current) => current.imageUrl !== imageUrl
                        ),
                      ])
                    }
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

export default CreateProductForm;
