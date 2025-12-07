import { stats } from "./send.js";

export default function handler(req, res) {
  stats.activeUsers = Math.floor(Math.random() * 20) + 1;  // demo

  stats.totalVisits++;

  res.status(200).json(stats);
}
