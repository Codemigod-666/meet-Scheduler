"use client";
import ScheduledMeeting from "@/components/ScheduledMeeting";
import { useSession } from "next-auth/react";
import React from "react";

const Meetings = () => {
  const { data: session } = useSession();

  if (!session) return <div>Unauthorized!</div>;

  return (
    <div className="">
      <ScheduledMeeting />
    </div>
  );
};

export default Meetings;
