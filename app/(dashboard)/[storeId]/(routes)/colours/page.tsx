import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import React from "react";
import { ColourColumn, columns } from "./_components/columns";
import { format } from "date-fns";
import AddButton from "@/components/add-button";
import ApiCard from "@/components/api-card";

async function ColoursPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const colours = await db.colour.findMany({
    where: {
      storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColourColumn[] = colours.map(
    ({ id, title, hexColorCode, createdAt }) => ({
      id,
      title,
      hexColorCode,
      createdAt: format(createdAt, "MMMM do, yyyy"),
    })
  );
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Colours"
          description="Create colours for your products"
        />

        <AddButton path={`/${storeId}/colours/create-colour`} />
      </header>
      <div className="mt-5">
        <DataTable searchKey="name" data={formattedColors} columns={columns} />
      </div>
      <div className="">
        <SectionHeader title="API" description="Api calls for colours" />
        <div className="mt-5">
          <ApiCard path="/colours" />
        </div>
      </div>
    </>
  );
}

export default ColoursPage;
