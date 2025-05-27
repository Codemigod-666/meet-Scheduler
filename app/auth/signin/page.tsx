// // app/auth/signin/page.tsx
// "use client"; // This page must be a Client Component if it uses signIn from next-auth/react

// import { setUser } from "@/app/store/userSlice";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

// export default function SignInPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { data: session, status } = useSession();
//   const dispatch = useDispatch();
//   const error = searchParams.get("error"); // Capture error messages from NextAuth.js

//   useEffect(() => {
//     if (session?.user) {
//       dispatch(
//         setUser({
//           name: session?.user?.name || null,
//           email: session?.user?.email || null,
//           image: session?.user?.image || null,
//         })
//       );
//       router.push("/");
//     }
//   }, [dispatch, router, session]);

//   if (status === "loading") {
//     return (
//       <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>
//     );
//   }

//   const handleLogin = async () => {
//     await signIn("google", { callbackUrl: "/" });
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>Sign In</h1>
//       {error && (
//         <p style={{ color: "red", marginBottom: "20px" }}>
//           Error:{" "}
//           {error === "OAuthAccountNotLinked"
//             ? "This email is already registered with a different provider."
//             : error}
//         </p>
//       )}
//       <button
//         onClick={handleLogin} // Redirects to home on success
//         style={{
//           padding: "10px 20px",
//           fontSize: "18px",
//           cursor: "pointer",
//           backgroundColor: "#4285F4",
//           color: "white",
//           border: "none",
//           borderRadius: "5px",
//         }}
//       >
//         Sign in
//       </button>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button"; // ShadCN Button
import { setUser } from "@/app/store/userSlice";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  const error = searchParams.get("error");

  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          name: session.user.name || null,
          email: session.user.email || null,
          image: session.user.image || null,
        })
      );
      router.push("/");
    }
  }, [dispatch, router, session]);

  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 flex items-center justify-center px-4">
      {/* Background blur bubble */}
      <div className="absolute -z-10 top-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute -z-10 bottom-10 left-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-40" />

      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center space-y-6">
        {/* <h1 className="text-3xl font-bold text-gray-800">
          Welcome to MeetEase 🚀
        </h1> */}
        <h1
          className=" inline
    text-2xl md:text-3xl font-extrabold tracking-wide 
    bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
    bg-clip-text text-transparent 
    hover:brightness-110 transition duration-300 ease-in-out
    drop-shadow-md
  "
        >
          Welcome to MeetGenie
        </h1>
        <span className="text-[25px]">&nbsp;🚀</span>
        <p className="text-muted-foreground text-sm">
          Your one-stop solution to instantly generate and schedule Google Meet
          links with ease.
        </p>
        {error && (
          <div className="text-red-500 text-sm font-medium">
            {error === "OAuthAccountNotLinked"
              ? "This email is already registered with another provider."
              : `Error: ${error}`}
          </div>
        )}
        <Button
          style={{ borderRadius: "10px" }}
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg py-2"
        >
          Sign in with Google
        </Button>
        <p className="text-xs text-muted-foreground mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
