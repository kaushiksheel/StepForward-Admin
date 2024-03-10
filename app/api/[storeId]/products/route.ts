import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
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

    console.log(thumbnails);
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existedProduct = await db.product.findFirst({
      where: {
        name,
        storeId,
      },
    });
    if (existedProduct) {
      return new NextResponse("Product already exists", { status: 400 });
    }

    await db.product.create({
      data: {
        name,
        slug,
        price,
        description,
        image,
        thumbnails: thumbnails?.map(
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

    return NextResponse.json({ message: "Product created" });
  } catch (error) {
    console.log("products", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const products = await db.product.findMany({
      where: {
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
    return NextResponse.json(products);
  } catch (error) {
    console.log("get products", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
