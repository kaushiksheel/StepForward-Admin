import React from "react";
import UpdateCategoryForm from "../_components/edit-category-form";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

async function CategoryIdPage({
  params: { categoryId, storeId },
}: {
  params: {
    categoryId: string;
    storeId: string;
  };
}) {
  const categoryById = await db.category.findFirst({
    where: {
      id: categoryId,
      storeId,
    },
  });

  return <UpdateCategoryForm category={categoryById as Category} />;
}

export default CategoryIdPage;
