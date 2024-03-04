import SectionHeader from "@/components/section-header";
import React from "react";
import CreateMaterialForm from "../_components/create-feature-form";
import CreateFeatureForm from "../_components/create-feature-form";

function CreateMaterialPage() {
  return (
    <>
      <header>
        <SectionHeader title="Create Feature" />
      </header>
      <div className="mt-5">
        <CreateFeatureForm />
      </div>
    </>
  );
}

export default CreateMaterialPage;
