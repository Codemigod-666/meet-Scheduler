import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addScheduledMeeting } from "../app/store/meetingSlice";
import { RootState } from "../app/store/store";
import { toast } from "react-toastify";

interface Meeting {
  link: string;
  createdAt: string;
  tag: string;
  scheduledFor: string;
}

export default function ScheduledMeeting() {
  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [scheduledMeetings, setScheduledMeetings] = useState<Meeting[]>([]);

  const [dateTime, setDateTime] = useState("");
  const dispatch = useDispatch();
  const meetings = useSelector(
    (state: RootState) => state.meeting.instantMeetings
  );

  useEffect(() => {
    if (meetings.length > 0) {
      const latestMeeting = meetings
        .filter((m) => m.tag === "scheduled")
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      setMeeting(latestMeeting[0] || null);
      setScheduledMeetings(latestMeeting);
    }
  }, [dispatch, meetings]);

  // const meeting =
  //   meetings
  //     .filter((m) => m.tag === "scheduled")
  //     .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))[0] || null;

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const res = await fetch("/api/generate/scheduled", {
  //     method: "POST",
  //     body: JSON.stringify({ dateTime }),
  //   });
  //   const data = await res.json();
  //   dispatch(addScheduledMeeting(data));
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const selectedDateTime = new Date(dateTime);
    const now = new Date();

    // 1. Check if the selected date is in the past
    if (selectedDateTime <= now) {
      toast.error("Cannot schedule a meeting in the past.");
      return;
    }

    // 2. Check for duplicate scheduled date/time
    const isDuplicate = meetings?.some(
      (meeting) =>
        new Date(meeting.scheduledFor).getTime() === selectedDateTime.getTime()
    );

    if (isDuplicate) {
      toast.error("A meeting is already scheduled at this date and time.");
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // Wait for 3 seconds (simulate delay)
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await fetch("/api/generate/scheduled", {
        method: "POST",
        body: JSON.stringify({ dateTime }),
      });

      if (!res.ok) {
        toast.error("Failed to schedule meeting.");
        return;
      }

      const data = await res.json();
      dispatch(addScheduledMeeting(data));
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
      toast.success("Meeting scheduled successfully!");
      toast.info(
        "You can view all scheduled meetings in the Scheduled Meetings section."
      );
    }
  };

  return (
    <div className="min-h-[750px] w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 m-0">
      <div className="w-full max-w-xl bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Schedule a Meeting
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg mb-2">
              Select Date & Time:
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl transition duration-300 ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Scheduling..." : "Schedule Meeting"}
          </button>
        </form>
        <div className="max-h-[400px] overflow-y-auto mt-8">
          {scheduledMeetings.length > 0 &&
            scheduledMeetings.map((meeting, index) => (
              <div
                key={index}
                className="mt-8 p-6 bg-white border border-gray-300 rounded-2xl shadow-inner"
              >
                <p className="text-gray-700 mb-3">
                  <strong className="block text-gray-900 text-lg mb-1">
                    {index + 1}. Scheduled Link:
                  </strong>
                  <a
                    href={meeting.link}
                    className="text-blue-600 underline break-all"
                    target="_blank"
                  >
                    {meeting.link}
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong className="block text-gray-900 text-lg mb-1">
                    Scheduled For:
                  </strong>
                  {new Date(meeting?.scheduledFor).toLocaleString()}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="p-4 border rounded-xl mt-6">
  //     <form onSubmit={handleSubmit}>
  //       <label>
  //         Select Date & Time:
  //         <input
  //           type="datetime-local"
  //           value={dateTime}
  //           onChange={(e) => setDateTime(e.target.value)}
  //           required
  //           className="border px-2 py-1 ml-2"
  //         />
  //       </label>
  //       <button
  //         className="bg-green-500 text-white px-4 py-2 ml-4 rounded"
  //         type="submit"
  //       >
  //         Schedule Meeting
  //       </button>
  //     </form>

  //     {meeting && (
  //       <div className="mt-4">
  //         <p>
  //           <strong>Scheduled Link:</strong>{" "}
  //           <a
  //             href={meeting.link}
  //             className="text-blue-600 underline"
  //             target="_blank"
  //           >
  //             {meeting.link}
  //           </a>
  //         </p>
  //         <p>
  //           <strong>Scheduled For:</strong>{" "}
  //           {new Date(meeting?.scheduledFor).toLocaleString()}
  //         </p>
  //       </div>
  //     )}
  //   </div>
  // );
}
