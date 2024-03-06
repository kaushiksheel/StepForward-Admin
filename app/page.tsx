import { CreateStoreModal } from "@/components/modals/store-modal";
import SectionHeader from "@/components/section-header";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";
import Image from "next/image";
import React from "react";

function StorePage() {
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

        <div className="mt-5 flex justify-center">
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
