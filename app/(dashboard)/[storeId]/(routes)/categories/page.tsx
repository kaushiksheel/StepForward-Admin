import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./_components/columns";
import { format } from "date-fns";
import AddButton from "@/components/add-button";
import ApiCard from "@/components/api-card";

async function CategoriesPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const categories = await db.category.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedCategories = categories.map(({ id, title, createdAt }) => ({
    id,
    title,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Categories"
          description="Create categories for your product"
        />
        <AddButton path={`/${storeId}/categories/create-category`} />
      </header>

      <div className="mt-5">
        <DataTable
          searchKey="name"
          data={formattedCategories}
          columns={columns}
        />
      </div>
      <div className="">
        <SectionHeader title="API" description="Api calls for categories" />
        <div className="mt-5">
          <ApiCard path="/categories" />
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
