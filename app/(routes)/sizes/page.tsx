import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./_components/column";
import { format } from "date-fns";
import AddButton from "@/components/add-button";

async function SizesPage() {
  const sizes = await db.size.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedSizes = sizes.map(({ id, title, slug, createdAt }) => ({
    id,
    title,
    slug,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Sizes"
          description="Manage sizes for your products"
        />
        <AddButton path="/sizes/create-sizes" />
      </header>
      <div className="mt-5">
        <DataTable searchKey="name" data={formattedSizes} columns={columns} />
      </div>
    </>
  );
}

export default SizesPage;
