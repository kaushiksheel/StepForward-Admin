import AddButton from "@/components/add-button";
import ApiCard from "@/components/api-card";
import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { columns } from "./_components/columns";

async function ProductsPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const products = await db.product.findMany({
    where: {
      storeId,
    },

    select: {
      id: true,
      name: true,
      price: true,
      description: true,
      image: true,
      slug: true,
      thumbnails: true,
      isFeatured: true,
      isInStock: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          title: true,
        },
      },
      feature: {
        select: {
          title: true,
        },
      },
      size: {
        select: {
          title: true,
        },
      },
      color: {
        select: {
          title: true,

          hexColorCode: true,
        },
      },
      material: {
        select: {
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedProducts = products.map(
    ({ id, name, createdAt, material, color, size, feature, category }) => ({
      id,
      name,
      material: material.title,
      color: color.title,
      size: size.title,
      category: category.title,
      feature: feature.title,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    })
  );
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title={`Products (${products?.length})`}
          description="Manage products for your store"
        />
        <AddButton path={`/${storeId}/products/create-product`} />
      </header>
      <div className="mt-5">
        <DataTable
          searchKey="name"
          data={formattedProducts}
          columns={columns}
        />
      </div>
      <div className="">
        <SectionHeader title="API" description="Api calls for products" />
        <div className="mt-5">
          <ApiCard path="/products" />
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
