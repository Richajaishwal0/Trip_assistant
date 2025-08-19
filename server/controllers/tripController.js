const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const estimateTrip = async (req, res) => {
  try {
    const { destination, days, budget } = req.body;

    if (!destination || !days || !budget) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

    const prompt = `Plan a trip with the following details:
Destination: ${destination}
Days: ${days}
Budget: ${budget} INR
Give me an estimated breakdown including travel, accommodation, food, and activities in simple points.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ result: responseText });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to fetch estimation" });
  }
};

module.exports = { estimateTrip };
