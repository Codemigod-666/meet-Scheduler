// app/auth/signin/page.tsx
"use client"; // This page must be a Client Component if it uses signIn from next-auth/react

import { setUser } from "@/app/store/userSlice";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const error = searchParams.get("error"); // Capture error messages from NextAuth.js

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          name: session?.user?.name || null,
          email: session?.user?.email || null,
          image: session?.user?.image || null,
        })
      );
      router.push("/");
    }
  }, [dispatch, router, session]);

  if (status === "loading") {
    return (
      <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>
    );
  }

  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Sign In</h1>
      {error && (
        <p style={{ color: "red", marginBottom: "20px" }}>
          Error:{" "}
          {error === "OAuthAccountNotLinked"
            ? "This email is already registered with a different provider."
            : error}
        </p>
      )}
      <button
        onClick={handleLogin} // Redirects to home on success
        style={{
          padding: "10px 20px",
          fontSize: "18px",
          cursor: "pointer",
          backgroundColor: "#4285F4",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        Sign in
      </button>
    </div>
  );
}
