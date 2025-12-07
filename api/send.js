let messages = [];
let stats = {
  activeUsers: 0,
  totalMessages: 0,
  totalVisits: 0
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message, username, date, time } = req.body;

    stats.totalMessages++;

    messages.push({
      id: messages.length + 1,
      username,
      date,
      time
    });

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}

export { messages, stats };
