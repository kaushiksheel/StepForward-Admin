import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await db.store.delete({
      where: {
        id: storeId,
        userId,
      },
    });

    return new NextResponse("Store deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}
