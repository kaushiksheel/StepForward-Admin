import { CreateStoreModal } from "@/components/modals/store-modal";
import SectionHeader from "@/components/section-header";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import { Plus } from "lucide-react";
import React from "react";

function StorePage() {
  return (
    <>
      <Navbar />
      <div className="container py-10">
        <header className="">
          <SectionHeader
            title="Create Stores"
            description="Create a new store to start selling your products."
          />
        </header>
        <div className="mt-5">
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
