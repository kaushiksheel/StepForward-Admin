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
      data: { slug, title },
    } = await req.json();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existedMaterial = await db.material.findFirst({
      where: {
        title,
        storeId,
      },
    });

    if (existedMaterial) {
      return new Response("Material already exists", { status: 400 });
    }

    await db.material.create({
      data: {
        slug,
        title,
        storeId,
      },
    });

    return new Response("Material created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const materials = await db.material.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(materials);
  } catch (error) {
    console.log("get categories", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
