import { CreateStoreModal } from "@/components/modals/store-modal";
import SectionHeader from "@/components/section-header";

import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

async function StorePage() {
  const { userId } = auth();
  const stores = await db.store.findMany({
    where: {
      userId: userId!,
    },
  });
  const options = stores?.map(({ name, id }) => ({
    value: id,
    label: name,
  }));

  return (
    <>
      <div className="container py-10 grid place-content-center w-screen h-screen place-items-center">
        <div className="w-[400px] h-[400px] relative">
          <Image
            fill
            src="/store.png"
            className="object-cover"
            alt="a store "
          />
        </div>
        <header className="text-center">
          <SectionHeader
            title="Create Stores"
            description="Create a new store to start selling your products."
          />
        </header>

        <div className="mt-5 flex justify-center space-x-4">
          <Dropdown options={options} placeholder="select store" />
          <CreateStoreModal>
            <Button>
              <Plus className="w-5 h-5 mr-2" />
              Create Store
            </Button>
          </CreateStoreModal>
        </div>
      </div>
    </>
  );
}

export default StorePage;
