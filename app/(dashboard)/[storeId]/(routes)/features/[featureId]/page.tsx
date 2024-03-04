import React from "react";

import { db } from "@/lib/db";
import { Category, Feature, Material } from "@prisma/client";
import UpdateMaterialForm from "../_components/edit-feature-form";

async function MaterialUpdatePage({
  params: { featureId, storeId },
}: {
  params: {
    featureId: string;
    storeId: string;
  };
}) {
  const featureById = await db.feature.findFirst({
    where: {
      id: featureId,
      storeId,
    },
  });

  return <UpdateMaterialForm feature={featureById as Feature} />;
}

export default MaterialUpdatePage;
