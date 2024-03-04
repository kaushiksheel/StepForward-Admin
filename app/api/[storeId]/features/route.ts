import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

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