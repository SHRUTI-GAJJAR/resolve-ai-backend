const { callAI } = require("./huggingface");
const { analyzeTicketPrompt } = require("./prompts");

const classifyByRules = (text) => {
  const t = text.toLowerCase();

  if (t.includes("payment") || t.includes("money") || t.includes("refund")) {
    return "Billing";
  }

  if (t.includes("login") || t.includes("password")) {
    return "Account";
  }

  if (t.includes("error") || t.includes("bug") || t.includes("crash")) {
    return "Technical";
  }

  return null;
};

const safeParse = (text) => {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) return JSON.parse(match[0]);
    throw new Error("Invalid JSON");
  }
};

const analyzeTicket = async (text) => {
  try {
    const ruleCategory = classifyByRules(text);

    if (ruleCategory) {
      return {
        category: ruleCategory,
        priority: "High",
        response: "We are checking your issue and will resolve it soon."
      };
    }

    const prompt = analyzeTicketPrompt(text);
    const aiRaw = await callAI(prompt);

    console.log("🔥 FINAL RAW AI:", aiRaw);

    const parsed = safeParse(aiRaw);

    return {
      category: parsed.category || "General",
      priority: parsed.priority || "Low",
      response: parsed.response || "We are looking into your issue."
    };

  } catch (error) {
    console.error("AI SERVICE FAILED:", error.message);

    return {
      category: "General",
      priority: "Low",
      response: "We are looking into your issue."
    };
  }
};

module.exports = { analyzeTicket };