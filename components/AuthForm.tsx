"use client";

import { ZodType } from "zod";
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";

interface Props<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
    type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) => {
    const router = useRouter();
    const isSignIn = type === "SIGN_IN";

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>,
    });

    const handleSubmit: SubmitHandler<T> = async (data) => {
        const result = await onSubmit(data);

        if (result.success) {
            toast.success(isSignIn ? "Logged in successfully" : "Account created successfully");
            router.push("/");
        } else {
            toast.error(`Error: ${isSignIn ? "Sign in" : "Sign up"} failed. ${result.error || "An error occurred"}`);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 py-8">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-gray-800">
                    {isSignIn ? "Welcome Back to NutriWise" : "Create a NutriWise Account"}
                </h1>
                <p className="text-gray-500 text-md text-center mb-6">
                    {isSignIn ? "NutriWise helps you find the right foods to meet your nutritional needs." : "NutriWise helps you create a healthy and balanced diet plan."}
                </p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
                        {Object.keys(defaultValues).map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field as Path<T>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="block text-gray-700 font-medium">
                                            {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                required
                                                type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                                                className="w-full px-4 py-3 rounded-lg border"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500 text-sm" />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button
                            type="submit"
                            className="w-full bg-emerald-600 font-semibold text-white py-2 rounded-lg hover:bg-emerald-700 transition duration-200"
                        >
                            {isSignIn ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>
                </Form>
                <p className="text-gray-500 text-center mt-4">
                    {isSignIn ? "Don't have an account? " : "Already have an account? "}
                    <Link href={isSignIn ? "/sign-up" : "/sign-in"} className="text-emerald-600 hover:text-emerald-700">
                        {isSignIn ? "Sign up here" : "Sign in here"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;