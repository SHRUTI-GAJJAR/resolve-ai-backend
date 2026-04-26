const axios = require("axios");

/**
 * STEP 1: Rule-based classification (FAST + RELIABLE)
 */
const classifyByRules = (text) => {
  const t = text.toLowerCase();

  if (
    t.includes("payment") ||
    t.includes("money") ||
    t.includes("deducted") ||
    t.includes("refund") ||
    t.includes("transaction")
  ) {
    return "Payment Issue";
  }

  if (
    t.includes("login") ||
    t.includes("password") ||
    t.includes("signup") ||
    t.includes("otp")
  ) {
    return "Login Issue";
  }

  if (
    t.includes("crash") ||
    t.includes("error") ||
    t.includes("bug") ||
    t.includes("issue")
  ) {
    return "Bug Report";
  }

  return null;
};

/**
 * STEP 2: Hugging Face fallback AI
 */
const callAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        inputs: `
You are a support assistant.

Return response in this format:
Category | Priority | Response

Rules:
- Payment/money/refund → Payment Issue
- login/password → Login Issue
- bug/error/crash → Bug Report

Ticket:
${prompt}
        `
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    const output = response.data?.[0]?.generated_text || "";

    console.log("🔥 HF RAW OUTPUT:", output);

    const parts = output.split("|").map((p) => p.trim());

    return {
      category: parts[0] || "General Inquiry",
      priority: parts[1] || "Low",
      response: parts[2] || "We are looking into your issue."
    };

  } catch (error) {
    console.error("HF ERROR:", error.message);
    throw error;
  }
};

/**
 * STEP 3: MAIN FUNCTION (USED IN SERVICE)
 */
const analyzeTicket = async (text) => {
  try {
    // 1. First try rules (FAST + ACCURATE)
    const ruleResult = classifyByRules(text);

    if (ruleResult) {
      return {
        category: ruleResult,
        priority: "High",
        response: "We are checking your issue and will resolve it soon."
      };
    }

    // 2. If no rule match → AI fallback
    return await callAI(text);

  } catch (error) {
    console.error("AI SERVICE FAILED:", error.message);

    return {
      category: "General Inquiry",
      priority: "Low",
      response: "We are looking into your issue."
    };
  }
};

module.exports = { analyzeTicket };