import SectionHeader from "@/components/section-header";
import { DataTable } from "@/components/ui/data-table";
import { db } from "@/lib/db";
import { format } from "date-fns";
import React from "react";
import { columns } from "./_components/columns";
import { features } from "process";
import AddButton from "@/components/add-button";

async function FeaturesPage() {
  const features = await db.feature.findMany();

  const formattedFeatures = features.map(({ createdAt, id, title }) => ({
    id,
    title,
    createdAt: format(createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Features"
          description="Create features for your products"
        />
        <AddButton path="/features/create-feature" />
      </header>
      <div className="mt-5">
        <DataTable
          searchKey="name"
          data={formattedFeatures}
          columns={columns}
        />
      </div>
    </>
  );
}

export default FeaturesPage;
