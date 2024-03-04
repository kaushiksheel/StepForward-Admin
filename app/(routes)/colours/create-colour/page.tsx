import SectionHeader from "@/components/section-header";
import React from "react";
import CreateColorForm from "../_components/create-color-form";

function CreateColorPage() {
  return (
    <>
      <header>
        <SectionHeader title="Create Color" />
      </header>
      <div className="mt-5">
        <CreateColorForm />
      </div>
    </>
  );
}

export default CreateColorPage;
