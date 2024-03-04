import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
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
      },
    });

    return new Response("Color created successfully", { status: 201 });
  } catch (error) {}
}
