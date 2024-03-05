import AddButton from "@/components/add-button";
import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import React from "react";
import { columns } from "./_components/columns";
import { format } from "date-fns";
import ApiCard from "@/components/api-card";

async function BillboardsPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const billboards = await db.billboard.findMany({
    where: {
      storeId,
    },
  });

  const formattedBillboards = billboards.map(({ id, label, createdAt }) => ({
    id,
    label,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));

  return (
    <>
      <header>
        <div className="flex justify-between items-center">
          <SectionHeader
            title="Billboards (4)"
            description="Manage billboards for your store"
          />
          <AddButton path={`/${storeId}/billboards/create-billboard`} />
        </div>
      </header>

      <div className="">
        <DataTable
          data={formattedBillboards}
          columns={columns}
          searchKey={""}
        />
      </div>
      <div className="">
        <SectionHeader title="API" description="Api calls for billboards" />
        <div className="mt-5">
          <ApiCard path="/billboards" />
        </div>
      </div>
    </>
  );
}

export default BillboardsPage;
