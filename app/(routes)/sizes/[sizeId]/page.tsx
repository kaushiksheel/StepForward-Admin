import React from "react";

import { db } from "@/lib/db";
import { Category, Size } from "@prisma/client";
import UpdateSizeForm from "../_components/edit-size-form";

async function SizeIdPage({
  params,
}: {
  params: {
    sizeId: string;
  };
}) {
  const sizeById = await db.size.findFirst({
    where: {
      id: params.sizeId,
    },
  });

  return <UpdateSizeForm size={sizeById as Size} />;
}

export default SizeIdPage;
