import SectionHeader from "@/components/section-header";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import React from "react";
import StoreCard from "./_components/store-card";

async function SettingsPage() {
  const { userId } = auth();
  const stores = await db.store.findMany({
    where: {
      userId: userId!,
    },
  });

  return (
    <>
      <header>
        <SectionHeader
          title="Settings"
          description="
        Manage your store settings here.
        "
        />
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-5">
        {stores.map(({ id, name, createdAt }) => (
          <StoreCard key={id} name={name} createdAt={createdAt} id={id} />
        ))}
      </div>
    </>
  );
}

export default SettingsPage;
