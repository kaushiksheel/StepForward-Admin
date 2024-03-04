import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { columns } from "./_components/columns";
import AddButton from "@/components/add-button";

async function Materials({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const materials = await db.material.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedMaterials = materials.map(({ createdAt, id, title }) => ({
    id,
    title,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Materials"
          description="Create materials for your products"
        />
        <AddButton path={`/${storeId}/materials/create-material`} />
      </header>
      <div className="mt-5">
        <DataTable
          searchKey="name"
          data={formattedMaterials}
          columns={columns}
        />
      </div>
    </>
  );
}

export default Materials;
