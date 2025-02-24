import { NextResponse } from "next/server";
import { db } from "@/db";
import { games, categories, libraryItems } from "@/db/game/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { users } from "@/db/user/schema";

// export async function GET(
//   request: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { userId } = auth();
//   const id = Number(params.id); // 'a', 'b', or 'c'
//   const data = await db.query.games.findFirst({
//     where: eq(games.id, id),
//     with: {
//       media: true,
//       categories: {
//         with: {
//           category: true,
//         },
//       },
//       platforms: {
//         with: {
//           platform: true,
//         },
//       },
//     },
//   });
//   let isOwned = false;
//   if (userId) {
//     const user = await db.query.users.findFirst({
//       where: eq(users.authId, userId),
//     });

//     if (user) {
//       isOwned = (await db.query.libraryItems.findFirst({
//         where: and(
//           eq(libraryItems.gameId, id),
//           eq(libraryItems.userId, user.id)
//         ),
//       }))
//         ? true
//         : false;
//     }
//   }
//   return NextResponse.json({ data, isOwned });
// }


export async function GET() {
  try {
    console.log("Fetching games..."); // Debug log

    const data = await db.select().from(games);
    console.log("Games found:", data); // Debug log

    if (!data || data.length === 0) {
      return NextResponse.json({ data: [] });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games", details: error },
      { status: 500 }
    );
  }
}
// export const revalidate = 1 // revalidate at most every hour
