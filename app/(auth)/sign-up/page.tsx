"use client";

import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validation";
import { signUp } from "@/lib/actions/auth";

const Page = () => (
  <AuthForm
    type="SIGN_UP"
    schema={signUpSchema}
    defaultValues={{
      email: "",
      password: "",
      fullName: "",
    }}
    onSubmit={signUp}
  />
);

export default Page;