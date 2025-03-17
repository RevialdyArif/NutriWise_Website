import { NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { meals } from "@/database/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";

// ✅ POST - Add Foods
export async function POST(req: Request) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, calories, protein, carbs, fat } = await req.json();
    if (!name || !calories || !protein || !carbs || !fat) {
        return NextResponse.json({ error: "Incomplete data" }, { status: 400 });
    }

    const newMeal = await db.insert(meals).values({
        userId: session.user.id,
        name,
        calories,
        protein,
        carbs,
        fat,
        createdAt: new Date(),
    });

    return NextResponse.json(newMeal, { status: 201 });
}

// ✅ GET - Get All Foods
export async function GET() {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userMeals = await db
      .select()
      .from(meals)
      .where(eq(meals.userId, session.user.id))

    return NextResponse.json(userMeals, { status: 200 });
}

// ✅ PUT - Update Foods
export async function PUT(req: Request) {
    const session = await auth();
    if (!session || !session.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, name, calories, protein, carbs, fat } = await req.json();
    if (!id || !name || !calories || !protein || !carbs || !fat) {
        return NextResponse.json({ error: "Uncompleted Data" }, { status: 400 });
    }

    await db
      .update(meals)
      .set({ 
          name, calories, protein, carbs, fat 
      })
      .where(eq(meals.id, id));

    return NextResponse.json({ message: "Food Updated" }, { status: 200 });
}

// ✅ DELETE - Delete Foods
export async function DELETE(req: Request) {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await req.json();
    if (!id) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        await db
          .delete(meals)
          .where(eq(meals.id, id));
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting meal:", error);
        return NextResponse.json({ error: "Failed to delete meal" }, { status: 500 });
    }
}