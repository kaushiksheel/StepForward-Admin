import SectionHeader from "@/components/section-header";
import React from "react";
import CreateCategoryForm from "../_components/create-category-form";

function CreateCategory() {
  return (
    <>
      <header>
        <SectionHeader title="Create Category" />
      </header>

      <div className="mt-4">
        <CreateCategoryForm />
      </div>
    </>
  );
}

export default CreateCategory;
