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
      data: { slug, title, hexCode },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const existedColour = await db?.colour.findFirst({
      where: {
        title,
        storeId,
      },
    });

    if (existedColour) {
      return new Response("Color already exists", { status: 400 });
    }

    await db.colour.create({
      data: {
        slug,
        title,
        hexColorCode: hexCode,
        storeId,
      },
    });

    return new Response("Color created successfully", { status: 201 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
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
    const colours = await db.colour.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(colours);
  } catch (error) {
    console.log("get categories", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
