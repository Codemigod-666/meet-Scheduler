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

  if (!dateTime) {
    return new Response("Missing dateTime", { status: 400 });
  }

  const authClient = new google.auth.OAuth2();
  authClient.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({ version: "v3", auth: authClient });

  try {
    const startDate = new Date(dateTime);
    const endDate = new Date(startDate.getTime() + 30 * 60000); // 30 mins later

    const event = await calendar.events.insert({
      calendarId: "primary",
      conferenceDataVersion: 1,
      requestBody: {
        summary: "Scheduled Meeting",
        description: "Generated via Schedule Meeting Page",
        start: {
          dateTime: startDate.toISOString(),
          timeZone: "UTC",
        },
        end: {
          dateTime: endDate.toISOString(),
          timeZone: "UTC",
        },
        conferenceData: {
          createRequest: {
            requestId: Math.random().toString(36).substring(2),
            conferenceSolutionKey: {
              type: "hangoutsMeet",
            },
          },
        },
      },
    });

    const meetLink =
      event.data?.hangoutLink ||
      event.data?.conferenceData?.entryPoints?.[0]?.uri;

    return Response.json({
      link: meetLink,
      createdAt: new Date().toISOString(),
      scheduledFor: startDate.toISOString(),
    });
  } catch (error) {
    console.error("Google Calendar API error: ", error);
    return new Response("Failed to create scheduled meeting", { status: 500 });
  }
}
