import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  {
    params: { featureId, storeId },
  }: { params: { featureId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.feature.update({
      where: {
        id: featureId,
        storeId,
      },
      data: {
        title,
        slug,
      },
    });

    return new Response("Feature updated", { status: 200 });
  } catch (error) {
    console.log("feature category", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { featureId, storeId },
  }: { params: { featureId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.feature.delete({
      where: {
        id: featureId,
        storeId,
      },
    });

    return new Response("Feature deleted", { status: 200 });
  } catch (error) {
    console.log("delete feature", error);
    return new Response("Internal error", { status: 500 });
  }
}
