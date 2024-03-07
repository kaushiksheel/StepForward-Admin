import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  {
    params: { storeId },
  }: {
    params: { storeId: string };
  }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const existingCategory = await db.category.findFirst({
      where: {
        title,
        storeId,
      },
    });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }
    await db.category.create({
      data: {
        title,
        slug,
        storeId,
      },
    });

    return new NextResponse("Category created", { status: 200 });
  } catch (error) {
    console.log("create category", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const categories = await db.category.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.log("get categories", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
