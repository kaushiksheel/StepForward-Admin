import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  {
    params: { materialId, storeId },
  }: { params: { materialId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.material.update({
      where: {
        id: materialId,
        storeId,
      },
      data: {
        title,
        slug,
      },
    });

    return new Response("Material updated", { status: 200 });
  } catch (error) {
    console.log("material category", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { materialId, storeId },
  }: { params: { materialId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.material.delete({
      where: {
        id: materialId,
        storeId,
      },
    });

    return new Response("Material deleted", { status: 200 });
  } catch (error) {
    console.log("delete material", error);
    return new Response("Internal error", { status: 500 });
  }
}
