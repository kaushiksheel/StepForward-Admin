import React from "react";

import { db } from "@/lib/db";
import { Size } from "@prisma/client";
import UpdateSizeForm from "../_components/edit-size-form";

async function SizeIdPage({
  params: { sizeId, storeId },
}: {
  params: {
    sizeId: string;
    storeId: string;
  };
}) {
  const sizeById = await db.size.findFirst({
    where: {
      id: sizeId,
      storeId,
    },
  });

  return <UpdateSizeForm size={sizeById as Size} />;
}

export default SizeIdPage;
