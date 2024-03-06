import SectionHeader from "@/components/section-header";
import React from "react";
import CreateProductForm from "../_components/create-product-form";
import { db } from "@/lib/db";

async function CreateProductPage({
  params: { storeId },
}: {
  params: { storeId: string };
}) {
  const categories = await db.category.findMany({
    where: {
      storeId: storeId,
    },
  });

  const features = await db.feature.findMany({
    where: {
      storeId: storeId,
    },
  });

  const sizes = await db.size.findMany({
    where: {
      storeId: storeId,
    },
  });

  const colours = await db.colour.findMany({
    where: {
      storeId: storeId,
    },
  });

  const materials = await db.material.findMany({
    where: {
      storeId: storeId,
    },
  });

  return (
    <>
      <header>
        <SectionHeader title="Create Product" />
      </header>

      <div className="mt-4">
        <CreateProductForm
          categories={categories}
          features={features}
          sizes={sizes}
          colours={colours}
          materials={materials}
        />
      </div>
    </>
  );
}

export default CreateProductPage;
