import { useDispatch, useSelector } from "react-redux";
import { addInstantMeeting } from "../app/store/meetingSlice";
import { RootState } from "../app/store/store";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Meeting {
  link: string;
  createdAt: string;
  tag: string;
  scheduledFor?: string;
}

export default function InstantMeeting() {
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [instantMeetings, setInstantMeetings] = useState<Meeting[]>([]);
  const dispatch = useDispatch();
  const meetings = useSelector(
    (state: RootState) => state.meeting.instantMeetings
  );
  // Get the latest instant meeting

  useEffect(() => {
    if (meetings.length > 0) {
      const latestMeeting = meetings
        .filter((m) => m.tag === "instant")
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
      setMeeting(latestMeeting[0] || null);
      setInstantMeetings(latestMeeting);
    }
  }, [dispatch, meetings]);

  // const meeting =
  //   meetings
  //     .filter((m) => m.tag === "instant")
  //     .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))[0] || null;

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const currentDate = new Date().toLocaleString();
      const [res] = await Promise.all([
        fetch("/api/generate/instant", {
          method: "POST",
          body: JSON.stringify({ dateTime: currentDate }),
        }),
        new Promise((resolve) => setTimeout(resolve, 3000)), // Wait for 3 seconds
      ]);

      if (!res.ok) {
        // Handle API error, e.g., throw new Error("Failed to generate meeting");
        console.error("API error:", res.status, res.statusText);
        throw new Error(`API error: ${res.status}`);
      }
      console.log("currentDate: ", currentDate);

      const data = await res.json();
      dispatch(addInstantMeeting(data));
    } catch (error) {
      console.error("Error generating instant meeting:", error);
      // You might want to set an error state here to display to the user
    } finally {
      setLoading(false);
      toast.success("Instant meeting generated successfully!");
      toast.info("You can list all meetings in the Meeting List page.");
    }
  };

  console.log("meeting created at: ", meeting?.createdAt);

  return (
    <div className="min-h-[720px] w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-300 px-4 m-0">
      <div className="w-full max-w-xl bg-white/60 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Instant Meeting Generator
        </h1>

        <button
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white text-lg py-3 rounded-xl transition duration-300 ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Instant Meeting"}
        </button>

        {/* {meeting && meeting.link !== "" && (
          <div className="mt-8 p-6 bg-white border border-gray-300 rounded-2xl shadow-inner">
            <p className="text-gray-700 mb-3">
              <strong className="block text-gray-900 text-lg mb-1">
                Meeting Link:
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
                Created At:
              </strong>
              {meeting.createdAt}
            </p>
          </div>
        )} */}
        <div className="max-h-[400px] overflow-y-auto mt-8">
          {instantMeetings.length > 0 &&
            instantMeetings?.map((meeting, index) => (
              <div key={index}>
                <div className="mt-8 p-6 bg-white border border-gray-300 rounded-2xl shadow-inner">
                  <p className="text-gray-700 mb-3">
                    <strong className="block text-gray-900 text-lg mb-1">
                      {index + 1}. Meeting Link:
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
                      Created At:
                    </strong>
                    {meeting.createdAt}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
