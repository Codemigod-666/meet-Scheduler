"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Ouch from "../assets/ouch.png";
import Image from "next/image";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <Card className="max-w-md mx-auto p-6">
        <CardContent>
          <p className="text-center text-muted-foreground">
            Loading authentication status...
          </p>
        </CardContent>
      </Card>
    );
  }

  if (session) {
    // User is signed in
    return (
      <Card className="min-w-md w-96 mx-auto mt-[-100px] shadow-lg">
        <CardHeader className="animate-ball-bounce">
          <div className="flex flex-col items-center gap-3">
            <Avatar className="w-32 h-32">
              <AvatarImage
                src={session.user?.image || ""}
                alt={session.user?.name || "User"}
              />
              <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <h2 className="font-semibold text-lg">
                Welcome, {session.user?.name || "User"}!
              </h2>
              <p className="text-muted-foreground text-sm">
                {session.user?.email}
              </p>
            </div>
          </div>
        </CardHeader>
        {/* <CardContent>
          <Button
            className="
    w-full mt-4 h-12 text-base font-semibold rounded-xl shadow
    bg-gradient-to-r from-red-500 to-pink-500
    hover:from-red-600 hover:to-pink-600
    text-white border-0
    transition-all duration-150
  "
            onClick={() =>
              signOut().then(() => {
                router.push("/auth/signin");
              })
            }
          >
            Sign Out
          </Button>
        </CardContent> */}
      </Card>
    );
  }

  // User is not signed in
  return (
    <Card className="max-w-md mx-auto shadow-lg">
      <CardHeader className="animate-ball-bounce flex flex-col items-center">
        <Image alt="Sign In" src={Ouch} width="100" height="100" />
        <h2 className="font-semibold text-lg text-center">
          You are not signed in
        </h2>
      </CardHeader>
      {/* <CardContent>
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 mt-2 bg-[#4285F4] hover:bg-[#357ae8] text-white"
          onClick={() => signIn("google")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
            alt="Google"
            className="w-5 h-5"
          />
          Sign in with Google
        </Button>
      </CardContent> */}
    </Card>
  );
}
