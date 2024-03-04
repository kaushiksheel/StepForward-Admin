import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  {
    params: { sizeId, storeId },
  }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.size.update({
      where: {
        id: sizeId,
        storeId,
      },
      data: {
        title,
        slug,
      },
    });

    return new Response("Size updated", { status: 200 });
  } catch (error) {
    console.log("size ", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { sizeId, storeId },
  }: { params: { sizeId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.size.delete({
      where: {
        id: sizeId,
        storeId,
      },
    });

    return new Response("size deleted", { status: 200 });
  } catch (error) {
    console.log("delete size", error);
    return new Response("Internal error", { status: 500 });
  }
}
