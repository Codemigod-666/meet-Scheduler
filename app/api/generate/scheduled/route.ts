export async function POST(req: Request) {
  const body = await req.json();
  const { dateTime } = body;

  const meetLink = `https://meet.google.com/${Math.random()
    .toString(36)
    .substring(2, 9)}`;

  return Response.json({
    link: meetLink,
    createdAt: new Date().toString(),
    scheduledFor: dateTime,
  });
}
