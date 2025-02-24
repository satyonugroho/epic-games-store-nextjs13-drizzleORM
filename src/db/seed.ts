import { db } from "./index";
import { games, categories, gamesToCategories } from "./game/schema";

async function seed() {
    try {
        // Insert categories
        const [action, adventure] = await db
            .insert(categories)
            .values([
                { name: "Action" },
                { name: "Adventure" }
            ])
            .returning();

        // Insert a game
        const [game] = await db
            .insert(games)
            .values({
                title: "Test Game",
                gameDescription: "Test Description",
                price: 29.99, // Changed from string to number
                coverImageUrl: "https://example.com/cover.jpg",
            })
            .returning();

        // Link game to categories
        await db.insert(gamesToCategories).values([
            { gameId: game.id, categoryId: action.id },
            { gameId: game.id, categoryId: adventure.id }
        ]);

        console.log("Seed completed successfully");
    } catch (error) {
        console.error("Error seeding:", error);
        process.exit(1); // Add exit code for error
    }
}

seed();