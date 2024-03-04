import React from "react";
import UpdateCategoryForm from "../../categories/_components/edit-category-form";
import { db } from "@/lib/db";
import UpdateColourForm from "../_components/edit-colour-form";
import { Colour } from "@prisma/client";

async function UpdateColorPage({
  params,
}: {
  params: {
    colourId: string;
  };
}) {
  const colorById = await db.colour.findFirst({
    where: {
      id: params.colourId,
    },
  });
  return <UpdateColourForm colour={colorById as Colour} />;
}

export default UpdateColorPage;
