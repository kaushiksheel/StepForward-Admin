import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  {
    params: { categoryId, storeId },
  }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.category.update({
      where: {
        id: categoryId,
        storeId,
      },
      data: {
        title,
        slug,
      },
    });

    return new Response("Category updated", { status: 200 });
  } catch (error) {
    console.log("update category", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { categoryId, storeId },
  }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.category.delete({
      where: {
        id: categoryId,
        storeId,
      },
    });

    return new Response("Category deleted", { status: 200 });
  } catch (error) {
    console.log("delete category", error);
    return new Response("Internal error", { status: 500 });
  }
}
