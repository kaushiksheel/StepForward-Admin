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
      data: { label, imageUrl },
    } = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }
    const existedBillboard = await db.billboard.findFirst({
      where: {
        label,
        storeId,
      },
    });

    if (existedBillboard) {
      return new NextResponse("Billboard already exists", { status: 400 });
    }

    await db.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });

    return new NextResponse("Billboard created", { status: 200 });
  } catch (error) {
    console.log("create billboard", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  {
    params: { storeId },
  }: {
    params: { storeId: string };
  }
) {
  try {
    const billboards = await db.billboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("billboard get ");
    return new NextResponse("Internal error", { status: 500 });
  }
}
