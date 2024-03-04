import React from "react";
import UpdateCategoryForm from "../_components/edit-category-form";
import { db } from "@/lib/db";
import { Category } from "@prisma/client";

async function CategoryIdPage({
  params,
}: {
  params: {
    categoryId: string;
  };
}) {
  const categoryById = await db.category.findFirst({
    where: {
      id: params.categoryId,
    },
  });

  return <UpdateCategoryForm category={categoryById as Category} />;
}

export default CategoryIdPage;
