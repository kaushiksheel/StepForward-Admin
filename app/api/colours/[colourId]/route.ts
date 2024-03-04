import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function PATCH(
  req: Request,
  { params: { colourId } }: { params: { colourId: string } }
) {
  try {
    const { userId } = auth();
    const {
      data: { slug, title, hexColorCode },
    } = await req.json();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.colour.update({
      where: {
        id: colourId,
      },
      data: {
        title,
        slug,
        hexColorCode,
      },
    });

    return new Response("Colour updated", { status: 200 });
  } catch (error) {
    console.log("update colour", error);
    return new Response("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params: { colourId } }: { params: { colourId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.colour.delete({
      where: {
        id: colourId,
      },
    });

    return new Response("Colour deleted", { status: 200 });
  } catch (error) {
    console.log("delete colour", error);
    return new Response("Internal error", { status: 500 });
  }
}
