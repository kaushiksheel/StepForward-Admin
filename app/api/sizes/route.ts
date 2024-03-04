import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title },
    } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const existingSize = await db.size.findFirst({
      where: {
        title,
      },
    });

    if (existingSize) {
      return new NextResponse("Size already exists", { status: 400 });
    }
    await db.size.create({
      data: {
        title,
        slug,
      },
    });

    return new NextResponse("Size created successfully", { status: 201 });
  } catch (error) {
    console.log("create size", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
