import SectionHeader from "@/components/section-header";
import React from "react";
import CreateMaterialForm from "../_components/create-material-form";

function CreateMaterialPage() {
  return (
    <>
      <header>
        <SectionHeader title="Create Material" />
      </header>
      <div className="mt-5">
        <CreateMaterialForm />
      </div>
    </>
  );
}

export default CreateMaterialPage;
