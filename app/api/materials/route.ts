import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
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
      },
    });

    if (existedMaterial) {
      return new Response("Material already exists", { status: 400 });
    }

    await db.material.create({
      data: {
        slug,
        title,
      },
    });

    return new Response("Material created", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
