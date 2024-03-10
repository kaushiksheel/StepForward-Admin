import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: {
        name,
        slug,
        price,
        description,
        image,
        thumbnails,
        isFeatured,
        isInStock,
        categoryId,
        featureId,
        sizeId,
        colorId,
        materialId,
      },
    } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.product.update({
      where: {
        id: productId,
      },

      data: {
        name,
        slug,
        price,
        description,
        image,
        thumbnails: thumbnails.map(
          (thumbnail: { imageUrl: string }) => thumbnail.imageUrl
        ),
        isFeatured,
        isInStock,
        storeId,
        categoryId,
        featureId,
        sizeId,
        colorId,
        materialId,
      },
    });

    return NextResponse.json({ message: "Product updated23" });
  } catch (error) {
    console.log("products", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params: { storeId, shoeSlug },
  }: { params: { storeId: string; shoeSlug: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const product = await db.product.findFirst({
      where: {
        slug: shoeSlug,
        storeId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        image: true,
        slug: true,
        thumbnails: true,
        isFeatured: true,
        isInStock: true,
        createdAt: true,
        updatedAt: true,
        category: {
          select: {
            title: true,
            slug: true,
            id: true,
          },
        },
        feature: {
          select: {
            title: true,
            slug: true,
            id: true,
          },
        },
        size: {
          select: {
            title: true,
            slug: true,
            id: true,
          },
        },
        color: {
          select: {
            title: true,
            slug: true,
            id: true,
          },
        },
        material: {
          select: {
            title: true,
            slug: true,
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params: { storeId, productId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
