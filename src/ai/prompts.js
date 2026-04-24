const analyzeTicketPrompt = (text) => `
You are an AI support assistant.

Analyze the following support ticket and classify it.

Text: "${text}"

Return ONLY valid JSON in this exact format:
{
  "category": "",
  "priority": "",
  "response": ""
}

Rules:
- Payment issues → Billing
- Login/password issues → Account
- Errors/bugs → Technical
- If unclear → General

Category must be one of: Billing, Technical, Account, General
Priority must be one of: Low, Medium, High

Do not include any explanation or extra text.
`;

module.exports = { analyzeTicketPrompt };