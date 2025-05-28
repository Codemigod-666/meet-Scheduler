// export async function POST(req: Request) {
//   const body = await req.json();
//   const { dateTime } = body;
//   const meetLink = `https://meet.google.com/${Math.random()
//     .toString(36)
//     .substring(2, 9)}`;
//   const meetingData = {
//     link: meetLink,
//     createdAt: dateTime || new Date(),
//   };
//   return Response.json(meetingData);
// }

import { auth } from "@/auth";
import { EnrichedSession } from "@/auth.config";
import { google } from "googleapis";

export async function POST(req: Request) {
  const session = (await auth()) as EnrichedSession;

  if (!session?.accessToken) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const { dateTime } = body;
  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    const event = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: "Instant Meeting",
        description: "Generated Via Instant Meeting Page",
        start: {
          dateTime:
            new Date(dateTime).toISOString() || new Date().toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: new Date(
            new Date(dateTime || new Date()).getTime() + 30 * 60000
          ).toISOString(),
          timeZone: "UTC",
        },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2),
            conferenceSolutionKey: { type: "hangoutsMeet" },
          },
        },
      },
    });

    const meetLink =
      event.data?.hangoutLink ||
      event.data?.conferenceData?.entryPoints?.[0]?.uri;

    return Response.json({
      link: meetLink,
      createdAt: dateTime || new Date(),
    });
  } catch (error) {
    console.error("Google Calendar API error: ", error);
    return new Response("Failed to create instant meeting", { status: 500 });
  }
}
