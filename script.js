// DOM elements
const form = document.getElementById("submitForm");
const tableBody = document.getElementById("tableBody");
const statActive = document.getElementById("stat-active");
const statSent = document.getElementById("stat-sent");
const statTarget = document.getElementById("stat-target");
const statusDiv = document.getElementById("submitStatus");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let message = document.getElementById("cookie").value;
  let username = document.getElementById("url").value;
  let date = document.getElementById("amount").value;
  let time = document.getElementById("interval").value;

  statusDiv.textContent = "Sending...";

  const result = await fetch("/api/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, username, date, time })
  });

  if (result.ok) {
    statusDiv.textContent = "Message sent!";
    loadTable();
    loadStats();
  } else {
    statusDiv.textContent = "Error sending message.";
  }
});

// Auto-refresh table
async function loadTable() {
  const req = await fetch("/api/table");
  const data = await req.json();

  tableBody.innerHTML = "";

  if (data.length === 0) {
    tableBody.innerHTML =
      `<tr><td colspan="4" style="color:#64748b;text-align:center">No messages</td></tr>`;
    return;
  }

  data.forEach((row) => {
    tableBody.innerHTML += `
      <tr>
        <td>${row.id}</td>
        <td>${row.username}</td>
        <td>${row.date}</td>
        <td style="text-align:right">${row.time}</td>
      </tr>
    `;
  });
}

async function loadStats() {
  const req = await fetch("/api/stats");
  const data = await req.json();

  statActive.textContent = data.activeUsers;
  statSent.textContent = data.totalMessages;
  statTarget.textContent = data.totalVisits;
}

// Auto-refresh every 3 seconds
setInterval(() => {
  loadTable();
  loadStats();
}, 3000);

// First load
loadTable();
loadStats();
