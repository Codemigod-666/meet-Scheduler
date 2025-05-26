// import React from "react";

// const Dashboard = () => {
//   return <div className="container mx-auto">Dashboard Page</div>;
// };

// export default Dashboard;

"use client";

import InstantMeeting from "../../components/InstantMeeting";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();
  if (!session) return <div>Unauthorized</div>;

  return (
    <div className="">
      <InstantMeeting />
    </div>
  );
}
