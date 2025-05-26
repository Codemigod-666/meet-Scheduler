export async function POST(req: Request) {
  const body = await req.json();
  const { dateTime } = body;
  const meetLink = `https://meet.google.com/${Math.random()
    .toString(36)
    .substring(2, 9)}`;
  const meetingData = {
    link: meetLink,
    createdAt: dateTime || new Date(),
  };
  return Response.json(meetingData);
}
