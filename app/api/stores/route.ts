import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    const {
      data: { name },
    } = await req.json();

    const existedStore = await db.store.findFirst({
      where: {
        name,
      },
    });

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    if (existedStore) {
      return new NextResponse("Store already created", { status: 404 });
    }

    const store = await db.store.create({
      data: {
        userId: userId!,
        name,
      },
    });
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.log("create store", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
