import SectionHeader from "@/components/section-header";

import React from "react";
import CreateBillboardForm from "../_components/create-billboard-form";

function CreateBillboardPage() {
  return (
    <>
      <header>
        <SectionHeader
          title="Create Billboard"
          description="Add a new billboard"
        />
      </header>
      <div className="mt-5">
        <CreateBillboardForm />
      </div>
    </>
  );
}

export default CreateBillboardPage;
