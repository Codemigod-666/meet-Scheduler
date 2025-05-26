import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { link } from "fs";

interface Meeting {
  link: string;
  createdAt: string;
  tag: "instant" | "scheduled";
  scheduledFor: string; // Optional, only for scheduled meetings
}

// Define the state type
interface MeetingState {
  instantMeetings: Meeting[];
}

const initialState: MeetingState = {
  instantMeetings: [],
};

const meetingSlice = createSlice({
  name: "meeting",
  initialState,
  reducers: {
    addInstantMeeting(state, action: PayloadAction<Meeting>) {
      state.instantMeetings.push({
        ...action.payload,
        tag: "instant",
        createdAt: action.payload.createdAt,
        scheduledFor: "",
      });
    },

    addScheduledMeeting(state, action: PayloadAction<Meeting>) {
      state.instantMeetings.push({
        ...action.payload,
        tag: "scheduled",
        createdAt: action.payload.createdAt,
        scheduledFor: action.payload.scheduledFor,
      });
    },
  },
});

export const { addInstantMeeting, addScheduledMeeting } = meetingSlice.actions;
export default meetingSlice.reducer;
