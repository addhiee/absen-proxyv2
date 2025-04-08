export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://absen-testv2.vercel.app"); // Boleh diganti ke domain tertentu
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    // Handle preflight
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxtBfvnusK1O1cLYiqFj2GNiSkYcr74t5lhvMgp5XYmomHv0ow3hpifKEdvGU0YVkc/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error("Proxy error:", error);
      res.status(500).json({ result: "error", message: error.message });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
