import React from "react";

import { db } from "@/lib/db";
import { Material } from "@prisma/client";
import UpdateMaterialForm from "../_components/edit-material-form";

async function MaterialUpdatePage({
  params: { materialId, storeId },
}: {
  params: {
    materialId: string;
    storeId: string;
  };
}) {
  const materialById = await db.material.findFirst({
    where: {
      id: materialId,
      storeId,
    },
  });

  return <UpdateMaterialForm material={materialById as Material} />;
}

export default MaterialUpdatePage;
