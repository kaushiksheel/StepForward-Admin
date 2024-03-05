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

    const existedFeature = await db.feature.findFirst({
      where: {
        title,
        storeId,
      },
    });

    if (existedFeature) {
      return new Response("feature already exists", { status: 400 });
    }

    await db.feature.create({
      data: {
        slug,
        title,
        storeId,
      },
    });

    return new Response("feature created", { status: 200 });
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
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const features = await db.feature.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(features);
  } catch (error) {
    console.log("get categories", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
