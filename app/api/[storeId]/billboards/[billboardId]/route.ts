import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  {
    params: { billboardId, storeId },
  }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { label, imageUrl },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.billboard.update({
      where: {
        id: billboardId,
        storeId,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return new Response("Billboard updated", { status: 200 });
  } catch (error) {
    console.log("billboard ", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { billboardId, storeId },
  }: { params: { billboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.billboard.delete({
      where: {
        id: billboardId,
        storeId,
      },
    });

    return new Response("billboard deleted", { status: 200 });
  } catch (error) {
    console.log("delete billboard", error);
    return new Response("Internal error", { status: 500 });
  }
}
