import SectionHeader from "@/components/section-header";
import React from "react";
import CreateSizesForm from "../_components/create-size-form";

function CreateSizesPage() {
  return (
    <>
      <header>
        <SectionHeader title="Create Sizes" />
      </header>
      <div className="mt-5">
        <CreateSizesForm />
      </div>
    </>
  );
}

export default CreateSizesPage;
