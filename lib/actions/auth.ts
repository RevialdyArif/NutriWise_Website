"use server"

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { signIn } from "@/auth";

interface AuthCredentials {
    fullName: string;
    email: string;
    password: string;
}

export const signInWithCredentials = async (
    params: Pick<AuthCredentials, 'email' | 'password'>
) => {
    const { email, password } = params;

    try {
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (result?.error) {
            return { success: false, error: result.error.message };
        }

        return { success: true };
    } catch (error) {
        console.log(error, "Error signing in user");
        return { success: false, error: "Error signing in user" };
    }
};
export const signUp = async (params: AuthCredentials) => {
    console.log("signUp function called with:", params);
    const { fullName, email, password } = params;

    // Check if user is already exist
    const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    if (existingUser.length > 0) {
        return { success: false, error: "User already exists" };
    }

    const hashedPassword = await hash(password, 10);

    try {
        await db.insert(users).values({
            fullName,
            email,
            password: hashedPassword
        });


        await signInWithCredentials({ email, password });

        return { success: true, message: "User has been signed up successfully" };
    } catch (error) {
        console.log(error, "Error signing up user");
        return { success: false, error: "Error signing up user" };
    }
};