const { analyzeTicketPrompt } = require("./prompts");
const { callAI } = require("./openai");

const safeParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("Invalid AI response format");
  }
};

const analyzeTicket = async (text) => {
  try {
    const prompt = analyzeTicketPrompt(text);
    const aiResponse = await callAI(prompt);
    const parsed = safeParse(aiResponse);

    return {
      category: parsed.category || "General",
      priority: parsed.priority || "Low",
      response: parsed.response || "We are looking into your issue."
    };
  } catch (error) {
    throw new Error("Ticket analysis failed");
  }
};

module.exports = { analyzeTicket };