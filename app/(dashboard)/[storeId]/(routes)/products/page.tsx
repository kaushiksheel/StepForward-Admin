import AddButton from "@/components/add-button";
import SectionHeader from "@/components/section-header";
import React from "react";

function ProductsPage() {
  return (
    <>
      <header className="flex justify-between items-center">
        <SectionHeader
          title="Products (3)"
          description="Manage products for your store"
        />
        <AddButton path="/products/create-product" />
      </header>
    </>
  );
}

export default ProductsPage;
