import React from "react";

import { db } from "@/lib/db";
import { Category, Feature, Material } from "@prisma/client";
import UpdateMaterialForm from "../_components/edit-feature-form";

async function MaterialUpdatePage({
  params: { featureId },
}: {
  params: {
    featureId: string;
  };
}) {
  const featureById = await db.feature.findFirst({
    where: {
      id: featureId,
    },
  });

  return <UpdateMaterialForm feature={featureById as Feature} />;
}

export default MaterialUpdatePage;
