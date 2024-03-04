import React from "react";

import { db } from "@/lib/db";
import { Category, Material } from "@prisma/client";
import UpdateMaterialForm from "../_components/edit-material-form";

async function MaterialUpdatePage({
  params: { materialId },
}: {
  params: {
    materialId: string;
  };
}) {
  const materialById = await db.material.findFirst({
    where: {
      id: materialId,
    },
  });

  return <UpdateMaterialForm material={materialById as Material} />;
}

export default MaterialUpdatePage;
