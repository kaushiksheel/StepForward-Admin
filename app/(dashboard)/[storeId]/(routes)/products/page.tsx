import AddButton from "@/components/add-button";
import ApiCard from "@/components/api-card";
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
      <div className="">
        <SectionHeader title="API" description="Api calls for products" />
        <div className="mt-5">
          <ApiCard path="/products" />
        </div>
      </div>
    </>
  );
}

export default ProductsPage;
