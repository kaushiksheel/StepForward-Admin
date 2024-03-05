import React from "react";

import { db } from "@/lib/db";
import { Billboard, Category } from "@prisma/client";
import UpdateCategoryForm from "../../categories/_components/edit-category-form";
import UpdateBillboardForm from "../_components/edit-billboard-form";

async function BillboardIdPage({
  params: { billboardId, storeId },
}: {
  params: {
    billboardId: string;
    storeId: string;
  };
}) {
  const billboardById = await db.billboard.findFirst({
    where: {
      id: billboardId,
      storeId,
    },
  });

  return (
    <UpdateBillboardForm billboard={billboardById as unknown as Billboard} />
  );
}

export default BillboardIdPage;
