import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { columns } from "./_components/columns";
import AddButton from "@/components/add-button";
import ApiCard from "@/components/api-card";

async function FeaturesPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const features = await db.feature.findMany();

  const formattedFeatures = features.map(({ createdAt, id, title }) => ({
    id,
    title,
    storeId,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Features"
          description="Create features for your products"
        />
        <AddButton path={`/${storeId}/features/create-feature`} />
      </header>
      <div className="mt-5">
        <DataTable
          searchKey="name"
          data={formattedFeatures}
          columns={columns}
        />
      </div>
      <div className="">
        <SectionHeader title="API" description="Api calls for features" />
        <div className="mt-5">
          <ApiCard path="/features" />
        </div>
      </div>
    </>
  );
}

export default FeaturesPage;
