import AddButton from "@/components/add-button";
import SectionHeader from "@/components/section-header";
import React from "react";

function BillboardsPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
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
    </>
  );
}

export default BillboardsPage;