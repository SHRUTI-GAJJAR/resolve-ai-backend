const axios = require("axios");

const callAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-small",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    const output = response.data?.[0]?.generated_text;

    console.log("🔥 RAW HF:", output);

    return output;

  } catch (error) {
    console.error("HF ERROR:", error.response?.data || error.message);
    throw new Error("AI API failed");
  }
};

module.exports = { callAI };