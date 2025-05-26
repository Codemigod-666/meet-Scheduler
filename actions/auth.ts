// actions/auth.ts
"use server";

import { signIn, signOut } from "@/auth"; // Import from your auth.ts file
import { AuthError } from "next-auth"; // For handling credentials sign-in errors

export async function handleSignIn(providerId?: string) {
  // If you want to handle specific providers with parameters
  if (providerId) {
    await signIn(providerId);
  } else {
    // Or, for credentials provider, you might pass formData
    // const email = formData.get('email');
    // const password = formData.get('password');
    // await signIn('credentials', { email, password });
  }
}

// For credentials login, you might handle errors more specifically
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}
