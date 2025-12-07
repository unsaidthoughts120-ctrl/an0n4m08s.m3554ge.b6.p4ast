import { messages } from "./send.js";

export default function handler(req, res) {
  res.status(200).json(messages);
}
